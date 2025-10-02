import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { CollectionPoint } from './collection-point.entity';

@Entity('user_checkpoints')
export class UserCheckpoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'uuid', name: 'point_id' })
  pointId: string;

  @Column({ type: 'timestamp', name: 'completed_at' })
  completedAt: Date;

  @ManyToOne(() => User, user => user.checkpoints)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => CollectionPoint, point => point.checkpoints)
  @JoinColumn({ name: 'point_id' })
  point: CollectionPoint;
}
