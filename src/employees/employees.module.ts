import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Employee} from './entities/employee.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
   imports : [TypeOrmModule.forFeature([Employee]),
AuthModule , AwsModule ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}

