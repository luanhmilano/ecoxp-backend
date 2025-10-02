import { CreateCollectionPointDto } from '../dto/create-collection-point.dto';
import { UpdateCollectionPointDto } from '../dto/update-collection-point.dto';
import { CollectionPoint } from '../../entities/collection-point.entity';

export interface AdmPanelServiceInterface {
  create(createCollectionPointDto: CreateCollectionPointDto): Promise<CollectionPoint>;
  findAll(): Promise<CollectionPoint[]>;
  findOne(id: string): Promise<CollectionPoint>;
  update(id: string, updateCollectionPointDto: UpdateCollectionPointDto): Promise<CollectionPoint>;
  remove(id: string): Promise<void>;
}
