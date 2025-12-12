import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCollectionPointDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsOptional()
	description?: string;
    
	@IsNumber()
	latitude: number;

	@IsNumber()
	longitude: number;
}