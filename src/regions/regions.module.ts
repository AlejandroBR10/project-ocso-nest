import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { Region } from './entities/region.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [TypeOrmModule.forFeature([Region]),
AuthModule],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
