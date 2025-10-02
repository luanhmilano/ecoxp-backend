import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdmPanelService } from '../services/adm-panel.service';
import { CreateCollectionPointDto } from '../dto/create-collection-point.dto';
import { UpdateCollectionPointDto } from '../dto/update-collection-point.dto';
import { AdmPanelControllerInterface } from './adm-panel.controller.interface';

@ApiTags('Collection Points')
@Controller('adm-panel/collection-points')
export class AdmPanelController implements AdmPanelControllerInterface {
  constructor(private readonly admPanelService: AdmPanelService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new collection point' })
  @ApiResponse({ status: 201, description: 'Collection point created' })
  create(@Body() createDto: CreateCollectionPointDto) {
    return this.admPanelService.create(createDto);
  }


  @Get()
  @ApiOperation({ summary: 'List all collection points' })
  @ApiResponse({ status: 200, description: 'List of collection points' })
  findAll() {
    return this.admPanelService.findAll();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a specific collection point' })
  @ApiResponse({ status: 200, description: 'Collection point found' })
  findOne(@Param('id') id: string) {
    return this.admPanelService.findOne(id);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Update a collection point' })
  @ApiResponse({ status: 200, description: 'Collection point updated' })
  update(@Param('id') id: string, @Body() updateDto: UpdateCollectionPointDto) {
    return this.admPanelService.update(id, updateDto);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a collection point' })
  @ApiResponse({ status: 204, description: 'Collection point deleted' })
  async remove(@Param('id') id: string) {
    await this.admPanelService.remove(id);
  }
}
