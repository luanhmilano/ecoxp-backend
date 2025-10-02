import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserCheckpoint } from './user-checkpoint.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 'uuid', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'João Silva', description: 'User name' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'joao@email.com', description: 'User email' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({ example: 'hashed_password', description: 'Password hash' })
  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash: string;

  @ApiProperty({ example: 'admin', description: 'User role' })
  @Column({ type: 'varchar', length: 50 })
  role: string;

  @ApiProperty({ example: 'uuid', description: 'Guardian user id (optional)' })
  @Column({ type: 'uuid', nullable: true, name: 'guardian_id' })
  guardianId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'guardian_id' })
  guardian: User;

  @OneToMany(() => UserCheckpoint, checkpoint => checkpoint.user)
  checkpoints: UserCheckpoint[];
}
