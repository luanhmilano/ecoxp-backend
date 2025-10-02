import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmPanelService } from './adm-panel.service';
import { CollectionPoint } from '../entities/collection-point.entity';
import { NotFoundException } from '@nestjs/common';

describe('AdmPanelService', () => {
  let service: AdmPanelService;
  let repository: Repository<CollectionPoint>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
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
        type: 'recycling',
        location: 'POINT(-46.6333 -23.5505)',
      };

      const savedPoint = { id: '123', ...createDto };

      mockRepository.create.mockReturnValue(savedPoint);
      mockRepository.save.mockResolvedValue(savedPoint);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createDto);
      expect(mockRepository.save).toHaveBeenCalledWith(savedPoint);
      expect(result).toEqual(savedPoint);
    });
  });

  describe('findAll', () => {
    it('should return an array of collection points', async () => {
      const points = [
        { id: '1', name: 'Point 1', type: 'recycling' },
        { id: '2', name: 'Point 2', type: 'donation' },
      ];

      mockRepository.find.mockResolvedValue(points);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(points);
    });
  });

  describe('findOne', () => {
    it('should return a collection point by id', async () => {
      const point = { id: '123', name: 'Test Point', type: 'recycling' };

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
      const existingPoint = { id: '123', name: 'Old Name', type: 'recycling' };
      const updateDto = { name: 'New Name' };
      const updatedPoint = { ...existingPoint, ...updateDto };

      mockRepository.findOne.mockResolvedValue(existingPoint);
      mockRepository.save.mockResolvedValue(updatedPoint);

      const result = await service.update('123', updateDto);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '123' } });
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(updatedPoint);
    });
  });

  describe('remove', () => {
    it('should remove a collection point', async () => {
      const point = { id: '123', name: 'Test Point', type: 'recycling' };

      mockRepository.findOne.mockResolvedValue(point);
      mockRepository.remove.mockResolvedValue(point);

      await service.remove('123');

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '123' } });
      expect(mockRepository.remove).toHaveBeenCalledWith(point);
    });
  });
});
