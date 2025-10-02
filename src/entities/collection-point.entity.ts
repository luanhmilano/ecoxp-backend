import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserCheckpoint } from './user-checkpoint.entity';

@Entity('collection_points')
export class CollectionPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  type: string;

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
