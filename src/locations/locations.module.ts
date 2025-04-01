import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Location } from './entities/location.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ManagersModule } from 'src/managers/managers.module';
import { Manager } from 'src/managers/entities/manager.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Location, Manager]),
ManagersModule , AuthModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
