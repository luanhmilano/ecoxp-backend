import { IsString, IsNotEmpty, IsNumber, IsArray, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LocationDto {
  @ApiProperty({ example: 'Point', description: 'GeoJSON type' })
  @IsString()
  @IsNotEmpty()
  type: 'Point';

  @ApiProperty({ example: [-46.6333, -23.5505], description: 'Coordinates [lng, lat]' })
  @IsNumber({}, { each: true })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2) 
  coordinates: [number, number];
}