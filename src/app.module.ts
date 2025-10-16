import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/ormconfig';
import { CollectionPoint } from './modules/entities/collection-point.entity';
import { UserCheckpoint } from './modules/entities/user-checkpoint.entity';
import { AdmPanelModule } from './modules/adm-panel/adm-panel.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig as any),
    TypeOrmModule.forFeature([User, CollectionPoint, UserCheckpoint]),
    AdmPanelModule,
    AuthModule,
  ],
})
export class AppModule {}
