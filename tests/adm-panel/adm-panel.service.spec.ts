import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmPanelService } from '../../src/modules/adm-panel/services/adm-panel.service';
import { CollectionPoint } from '../../src/modules/entities/collection-point.entity';
import { NotFoundException } from '@nestjs/common';

describe('AdmPanelService', () => {
  let service: AdmPanelService;
  let repository: Repository<CollectionPoint>;


  let mockRepository: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOne: jest.Mock;
    remove: jest.Mock;
  };

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdmPanelService,
        {
          provide: getRepositoryToken(CollectionPoint),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AdmPanelService>(AdmPanelService);
    repository = module.get<Repository<CollectionPoint>>(
      getRepositoryToken(CollectionPoint),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a collection point', async () => {

      const createDto = {
        name: 'Test Point',
        latitude: -23.5505,
        longitude: -46.6333,
        description: 'Ponto de teste'
      };

      const savedPoint = { id: '123', ...createDto };

      mockRepository.create.mockReturnValue(savedPoint);
      mockRepository.save.mockResolvedValue(savedPoint);

      const result = await service.create(createDto as any);

      expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Test Point',
        latitude: -23.5505,
        longitude: -46.6333
      }));
      expect(mockRepository.save).toHaveBeenCalledWith(savedPoint);
      expect(result).toEqual(savedPoint);
    });

    it('should accept GeoJSON location and map to latitude/longitude', async () => {
      const createDtoWithLocation = {
        name: 'GeoJSON Point',
        location: { type: 'Point', coordinates: [-46.6333, -23.5505] },
      };

      const expectedPayload = {
        id: '456',
        name: 'GeoJSON Point',
        latitude: -23.5505,
        longitude: -46.6333,
      };

      mockRepository.create.mockReturnValue(expectedPayload);
      mockRepository.save.mockResolvedValue(expectedPayload);

      const result = await service.create(createDtoWithLocation as any);

      expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({
        name: 'GeoJSON Point',
        latitude: -23.5505,
        longitude: -46.6333
      }));
      expect(result).toEqual(expectedPayload);
    });
  });

  describe('findAll', () => {
    it('should return an array of collection points', async () => {
      const points = [
        { id: '1', name: 'Point 1', latitude: -23.55, longitude: -46.63 },
        { id: '2', name: 'Point 2', latitude: -22.90, longitude: -43.20 },
      ];

      mockRepository.find.mockResolvedValue(points);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(points);
    });
  });

  describe('findOne', () => {
    it('should return a collection point by id', async () => {
      const point = { id: '123', name: 'Test Point', latitude: -23.55, longitude: -46.63 };

      mockRepository.findOne.mockResolvedValue(point);

      const result = await service.findOne('123');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '123' } });
      expect(result).toEqual(point);
    });

    it('should throw NotFoundException if point not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a collection point', async () => {
      const existingPoint = { id: '123', name: 'Old Name', latitude: -23.55, longitude: -46.63 };
      const updateDto = { name: 'New Name' };
      const updatedPoint = { ...existingPoint, ...updateDto };

      mockRepository.findOne.mockResolvedValue(existingPoint);
      mockRepository.save.mockResolvedValue(updatedPoint);

      const result = await service.update('123', updateDto as any);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '123' } });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(updatedPoint);
    });

    it('should map GeoJSON location on update', async () => {
      const existingPoint = { id: '789', name: 'Old', latitude: -23.55, longitude: -46.63 };
      const updateDto = { location: { type: 'Point', coordinates: [-46.63, -23.55] } };
      const updatedPoint = { ...existingPoint, latitude: -23.55, longitude: -46.63 };

      mockRepository.findOne.mockResolvedValue(existingPoint);
      mockRepository.save.mockResolvedValue(updatedPoint);

      const result = await service.update('789', updateDto as any);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '789' } });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(updatedPoint);
    });
  });

  describe('remove', () => {
    it('should remove a collection point', async () => {
      const point = { id: '123', name: 'Test Point', latitude: -23.55, longitude: -46.63 };

      mockRepository.findOne.mockResolvedValue(point);
      mockRepository.remove.mockResolvedValue(point);

      await service.remove('123');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '123' } });
      expect(mockRepository.remove).toHaveBeenCalledWith(point);
    });
  });
});
