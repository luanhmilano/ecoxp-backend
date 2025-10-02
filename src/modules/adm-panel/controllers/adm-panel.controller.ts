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
import { AdmPanelService } from '../services/adm-panel.service';
import { CreateCollectionPointDto } from '../dto/create-collection-point.dto';
import { UpdateCollectionPointDto } from '../dto/update-collection-point.dto';
import { AdmPanelControllerInterface } from './adm-panel.controller.interface';

@Controller('adm-panel/collection-points')
export class AdmPanelController implements AdmPanelControllerInterface {
  constructor(private readonly admPanelService: AdmPanelService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateCollectionPointDto) {
    return this.admPanelService.create(createDto);
  }

  @Get()
  findAll() {
    return this.admPanelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.admPanelService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateCollectionPointDto) {
    return this.admPanelService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.admPanelService.remove(id);
  }
}
