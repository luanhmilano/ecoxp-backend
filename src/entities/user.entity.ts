import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserCheckpoint } from './user-checkpoint.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'varchar', length: 50 })
  role: string;

  @Column({ type: 'uuid', nullable: true, name: 'guardian_id' })
  guardianId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'guardian_id' })
  guardian: User;

  @OneToMany(() => UserCheckpoint, checkpoint => checkpoint.user)
  checkpoints: UserCheckpoint[];
}
