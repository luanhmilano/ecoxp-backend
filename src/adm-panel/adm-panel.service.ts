import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CollectionPoint } from '../entities/collection-point.entity';
import { CreateCollectionPointDto } from './dto/create-collection-point.dto';
import { UpdateCollectionPointDto } from './dto/update-collection-point.dto';

@Injectable()
export class AdmPanelService {
  constructor(
    @InjectRepository(CollectionPoint)
    private collectionPointRepository: Repository<CollectionPoint>,
  ) {}

  async create(createDto: CreateCollectionPointDto): Promise<CollectionPoint> {
    const collectionPoint = this.collectionPointRepository.create(createDto);
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
    
    Object.assign(collectionPoint, updateDto);
    
    return await this.collectionPointRepository.save(collectionPoint);
  }

  async remove(id: string): Promise<void> {
    const collectionPoint = await this.findOne(id);
    await this.collectionPointRepository.remove(collectionPoint);
  }
}
