import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { audit } from 'rxjs';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Location } from './entities/location.entity';

//@ApiAuth()
//@ApiBearerAuth()
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  //  @Auth()
  @ApiResponse({
      status: 201,
      example: {
      locationName: "Ocso Juriquilla",
    locationAddress: "Avenida Tal, S/N 76220",
    locationLatLng: [12,12]
      } as Location
    })
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  //@Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
      status: 201,
      example: {
       message :"This route return the ALL the locations on the DB"
      }
    })
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route return the specific location with the corresponding ID"
    }
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne(+id);
  }

  @Auth()
  @ApiResponse({
    status: 201,
    example: {
     message :"This route update the specific location with the corresponding ID"
    }
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @Auth()
  @ApiResponse({
    status: 201,
    example: {
     message :"This route remove the specific location with the corresponding ID"
    }
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(+id);
  }
}
