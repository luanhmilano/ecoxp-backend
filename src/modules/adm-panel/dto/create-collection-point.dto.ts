import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionPointDto {
  @ApiProperty({ example: 'Ponto Central', description: 'Collection point name' })
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  @ApiProperty({ example: 'recycling', description: 'Type of collection point' })
  @IsString({ message: 'O tipo deve ser um texto.' })
  @IsNotEmpty({ message: 'O tipo não pode estar vazio.' })
  type: string;

  @ApiProperty({ description: 'Geographic location' })
  @IsObject({ message: 'A localização deve ser um objeto.' })
  @IsNotEmpty({ message: 'A localização não pode estar vazia.' })
  location: string;
}
