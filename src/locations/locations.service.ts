import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository : Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepository.save(createLocationDto);
  }

  findAll() {
    return this.locationRepository.find();
  }

  findOne(id: number) {
    const location = this.locationRepository.findOneBy({
      locationId : id
    });
    if(!location){
      throw new NotFoundException("Location not found");
    }
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    //set manager to null
    
    this.managerRepository.createQueryBuilder().update().set({ location:  null }).where(
      "locationId = :id", {
        id,
      }
    ).execute();
    const locationToUpdate = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto
    });
    if(!locationToUpdate) throw new NotFoundException();
    
    const saveLocation = await this.locationRepository.save(locationToUpdate);

    const updatedManager  = await this.managerRepository.preload({
      managerId : updateLocationDto.manager,
      location : locationToUpdate,
    })
    if(!updatedManager) throw new NotFoundException("Manager no encontrado");
    this.managerRepository.save(updatedManager);
    
    return saveLocation;
  }
 
  remove(id: number) {
    this.findOne(id);
    const location = this.locationRepository.delete({
      locationId : id
    });
    return {
    message: `Objeto con el id:${id} eliminado correctamente`,
  }
}
}
