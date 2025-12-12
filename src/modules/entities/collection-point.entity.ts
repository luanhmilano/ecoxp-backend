import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserCheckpoint } from './user-checkpoint.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('collection_point')
export class CollectionPoint {
	@ApiProperty({ example: 'uuid', description: 'Unique identifier' })
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ example: -23.5505, description: 'Latitude do ponto' })
	@Column('double', { nullable: false })
	latitude: number;

	@ApiProperty({ example: -46.6333, description: 'Longitude do ponto' })
	@Column('double', { nullable: false })
	longitude: number;

	@ApiProperty({ example: 'Ponto Central', description: 'Nome do ponto' })
	@Column({ type: 'varchar', length: 150, nullable: false })
	name: string;

	@ApiProperty({ example: 'Ponto de reciclagem local', description: 'Descrição' })
	@Column({ type: 'text', nullable: true })
	description?: string;

	@ApiProperty({ example: 'Rua Exemplo, 123', description: 'Endereço' })
	@Column({ type: 'varchar', length: 200, nullable: true })
	address?: string;

	@ApiProperty({ example: 'São Paulo', description: 'Cidade' })
	@Column({ type: 'varchar', length: 100, nullable: true })
	city?: string;

	@ApiProperty({ example: '01000-000', description: 'Código postal' })
	@Column({ type: 'varchar', length: 30, nullable: true, name: 'postal_code' })
	postalCode?: string;

	@ApiProperty({ example: 'Brasil', description: 'País' })
	@Column({ type: 'varchar', length: 100, nullable: true })
	country?: string;

	@ApiProperty({ example: '+5511999999999', description: 'Telefone' })
	@Column({ type: 'varchar', length: 30, nullable: true })
	phone?: string;

	@ApiProperty({ example: 'contato@ponto.com', description: 'Email' })
	@Column({ type: 'varchar', length: 150, nullable: true })
	email?: string;

	@ApiProperty({ example: true, description: 'Se o ponto está ativo' })
	@Column({ type: 'boolean', default: true, name: 'is_active' })
	isActive: boolean;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	// Relação com checkpoints de usuários
	@OneToMany(() => UserCheckpoint, checkpoint => checkpoint.point)
	checkpoints: UserCheckpoint[];
}