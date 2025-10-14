import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmPanelModule } from './modules/adm-panel/adm-panel.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/entities/user.entity';
import { CollectionPoint } from './modules/entities/collection-point.entity';
import { UserCheckpoint } from './modules/entities/user-checkpoint.entity';
import { typeOrmConfig } from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User, CollectionPoint, UserCheckpoint]),
  AdmPanelModule,
  AuthModule,
  ],
})
export class AppModule {}
