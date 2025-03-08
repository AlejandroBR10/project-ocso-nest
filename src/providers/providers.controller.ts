import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UserData } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiBearerAuth, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { Provider } from './entities/provider.entity';

@ApiAuth()
@ApiBearerAuth()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
        providerName: "Coca-Cola Company",
        providerEmail: "cocacola@gmail.com",
        providerPhoneNumber: "4421237891"
      
    } as Provider
  })
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route return ALL existing providers on the DB"
    }
  })
  @Get()
  findAll(@UserData() user : User) {
    if(user.userRoles.includes("Employee")) throw new UnauthorizedException("No estas autorizado, solo admins y managers estan permitidos");
    return this.providersService.findAll();
  }

  @Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route return the provider by the specific NAME"
    }
  })
  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.providersService.findByName(name);
  }

  @Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route return the provider by the specific ID"
    }
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route update the provider by the specific ID"
    }
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route remove the provider by the specific ID"
    }
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
