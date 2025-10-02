import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionPoint } from '../entities/collection-point.entity';
import { AdmPanelController } from './controllers/adm-panel.controller';
import { AdmPanelService } from './services/adm-panel.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionPoint])],
  controllers: [AdmPanelController],
  providers: [AdmPanelService],
})
export class AdmPanelModule {}
