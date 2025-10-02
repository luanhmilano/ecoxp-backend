import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { CollectionPoint } from './collection-point.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_checkpoints')
export class UserCheckpoint {
  @ApiProperty({ example: 'uuid', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'uuid', description: 'User id' })
  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ApiProperty({ example: 'uuid', description: 'Collection point id' })
  @Column({ type: 'uuid', name: 'point_id' })
  pointId: string;

  @ApiProperty({ example: '2025-10-02T12:00:00Z', description: 'Completion timestamp' })
  @Column({ type: 'timestamp', name: 'completed_at' })
  completedAt: Date;

  @ManyToOne(() => User, user => user.checkpoints)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => CollectionPoint, point => point.checkpoints)
  @JoinColumn({ name: 'point_id' })
  point: CollectionPoint;
}
