import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { ROLES } from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Manager } from './entities/manager.entity';

@ApiAuth()
@ApiBearerAuth()
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Auth()
  @ApiResponse({
    status: 201,
    example: {
      managerFullName: "Leonardo Guzman",
  managerSalary: 1000000,
  managerEmail: "leonardoManager@gmail.com",
  managerPhoneNumber: "4425567892"

    } as Manager
  })
  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Auth()
  @ApiResponse({
      status: 201,
      example: {
       message :"This route return ALL the managers on the DB"
      }
    })
  @Get()
  findAll() {
    return this.managersService.findAll();
  }

  @Auth()
  @ApiResponse({
    status: 201,
    example: {
     message :"This route return the specific manager with the corresponding ID"
    }
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managersService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route update the specific manager with the corresponding ID"
    }
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Auth()
  @ApiResponse({
    status: 201,
    example: {
     message :"This route remove the specific manager with the corresponding ID"
    }
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managersService.remove(id);
  }
}
