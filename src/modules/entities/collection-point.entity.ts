import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserCheckpoint } from './user-checkpoint.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from '../adm-panel/dto/location.dto';

@Entity('collection_points')
export class CollectionPoint {
  @ApiProperty({ example: 'uuid', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Ponto Central', description: 'Collection point name' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'recycling', description: 'Type of collection point' })
  @Column({ type: 'varchar', length: 100 })
  type: string;

  @ApiProperty({ type: () => LocationDto, description: 'Geographic location' })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: string;

  @OneToMany(() => UserCheckpoint, checkpoint => checkpoint.point)
  checkpoints: UserCheckpoint[];
}
