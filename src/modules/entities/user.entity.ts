import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { UserCheckpoint } from './user-checkpoint.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 'uuid', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;


  @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário' })
  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @ApiProperty({ example: 'joaosilva', description: 'Username do usuário' })
  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;


  @ApiProperty({ example: 'joao@email.com', description: 'E-mail do usuário' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({ example: '+5511999999999', description: 'Telefone do usuário' })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;


  @ApiProperty({ example: 'hashed_password', description: 'Hash da senha' })
  @Column({ type: 'varchar', length: 255, name: 'password_hash' })
  passwordHash: string;


  @ApiProperty({ example: 'admin', description: 'Perfil do usuário' })
  @Column({ type: 'varchar', length: 50, default: 'user' })
  role: string;


  @ApiProperty({ example: 'uuid', description: 'ID do responsável (opcional para menores de 12 anos)' })
  @Column({ type: 'uuid', nullable: true, name: 'guardian_id' })
  guardianId: string;

  @ApiProperty({ example: true, description: 'Usuário menor de 12 anos' })
  @Column({ type: 'boolean', default: false })
  isUnder12: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'guardian_id' })
  guardian: User;

  @OneToMany(() => UserCheckpoint, checkpoint => checkpoint.user)
  checkpoints: UserCheckpoint[];
}
