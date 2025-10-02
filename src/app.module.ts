import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './ormconfig';
import { AdmPanelModule } from './adm-panel/adm-panel.module';
import { User } from './entities/user.entity';
import { CollectionPoint } from './entities/collection-point.entity';
import { UserCheckpoint } from './entities/user-checkpoint.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, CollectionPoint, UserCheckpoint]),
    AdmPanelModule,
  ],
})
export class AppModule {}
