import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionPoint } from '../../entities/collection-point.entity';
import { CreateCollectionPointDto } from '../dto/create-collection-point.dto';
import { UpdateCollectionPointDto } from '../dto/update-collection-point.dto';
import { AdmPanelServiceInterface } from './adm-panel.service.interface';

@Injectable()
export class AdmPanelService implements AdmPanelServiceInterface {
  constructor(
    @InjectRepository(CollectionPoint)
    private readonly collectionPointRepository: Repository<CollectionPoint>,
  ) {}

  async create(createDto: CreateCollectionPointDto): Promise<CollectionPoint> {
    const payload: any = { ...createDto };
    if (payload.location && Array.isArray(payload.location.coordinates)) {
      const [lng, lat] = payload.location.coordinates;
      payload.longitude = lng;
      payload.latitude = lat;
      delete payload.location;
    }

    const collectionPoint: CollectionPoint = this.collectionPointRepository.create(payload) as unknown as CollectionPoint;
    return await this.collectionPointRepository.save(collectionPoint);
  }

  async findAll(): Promise<CollectionPoint[]> {
    return await this.collectionPointRepository.find();
  }

  async findOne(id: string): Promise<CollectionPoint> {
    const collectionPoint = await this.collectionPointRepository.findOne({
      where: { id },
    });
    
    if (!collectionPoint) {
      throw new NotFoundException(`Collection point with ID ${id} not found`);
    }
    
    return collectionPoint;
  }

  async update(
    id: string,
    updateDto: UpdateCollectionPointDto,
  ): Promise<CollectionPoint> {
    const collectionPoint = await this.findOne(id);
    
    const payload: any = { ...updateDto };
    if (payload.location && Array.isArray(payload.location.coordinates)) {
      const [lng, lat] = payload.location.coordinates;
      payload.longitude = lng;
      payload.latitude = lat;
      delete payload.location;
    }

    Object.assign(collectionPoint, payload);
    
    return await this.collectionPointRepository.save(collectionPoint);
  }

  async remove(id: string): Promise<void> {
    const collectionPoint = await this.findOne(id);
    await this.collectionPointRepository.remove(collectionPoint);
  }
}
