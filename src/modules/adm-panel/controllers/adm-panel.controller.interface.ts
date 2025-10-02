import { CreateCollectionPointDto } from '../dto/create-collection-point.dto';
import { UpdateCollectionPointDto } from '../dto/update-collection-point.dto';
import { CollectionPoint } from '../../entities/collection-point.entity';
import { Response } from 'express';

export interface AdmPanelControllerInterface {
  create(createCollectionPointDto: CreateCollectionPointDto, res: Response): Promise<CollectionPoint>;
  findAll(res: Response): Promise<CollectionPoint[]>;
  findOne(id: string, res: Response): Promise<CollectionPoint>;
  update(id: string, updateCollectionPointDto: UpdateCollectionPointDto, res: Response): Promise<CollectionPoint>;
  remove(id: string, res: Response): Promise<void>;
}
