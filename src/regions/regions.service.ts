import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';
import { isUtf8 } from 'buffer';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository : Repository<Region>
  ){}
  create(createRegionDto: CreateRegionDto) {
    const region = this.regionRepository.save(createRegionDto);
    return region;

  }

  findAll() {
    return this.regionRepository.find();
  }

  findOne(id: number) {
    const region = this.regionRepository.findOneBy({
      regionId: id
    })
    if(!region){
      throw new NotFoundException("Region not found");
    }
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto
    })
    if(!regionToUpdate){
      throw new NotFoundException("Region not found");
    }
    this.regionRepository.save(regionToUpdate);
    return regionToUpdate;
  }

  remove(id: number) {
    this.findOne(id);
      this.regionRepository.delete({regionId: id});
      return {
        message: `Objeto con el id: ${id} eliminado correctamente`,
      }
    }
    
  }

