import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ROLES } from 'src/auth/constants/roles.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { AwsService } from 'src/aws/aws.service';

@ApiAuth()
//@ApiTags('Employees')
@ApiBearerAuth()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService, private readonly awsService : AwsService)  {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUID",
      employeeName : "Alejandro",
      employeeEmail : "alejandro@gmail.com",
      employeeLastName : "Balderas",
      employeePhoneNumber : "1234567890" ,
    } as Employee
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }


  //@Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@Param('id') id: string , @UploadedFile() file: Express.Multer.File){
    //console.log(file);
    const response =  await this.awsService.uploadFile(file);
    return this.employeesService.update(id,{
      employeePhoto : response
    })
  }

@Auth(ROLES.MANAGER)
@ApiResponse({
  status: 201,
  example: {
    message :"This route return ALL existing employees on DB"
  }
})

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route return the specific employee with the corresponding ID"
    }
  })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: "4"})) id: string) {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get('/location/:id')
  findAllLocation(@Param('id') id: string){
    return this.employeesService.findByLocation(+id);
  }


  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route update the specific employee with the corresponding ID"
    }
  })
  @Patch('/:id')
  update(@Param('id', new ParseUUIDPipe({version: "4"})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route remove the employee with the corresponding ID"
    }
  })
  @Delete(':id')
  remove(@Param('id' , new ParseUUIDPipe({version: "4"})) id: string) {
    return this.employeesService.remove(id);
  }
}
