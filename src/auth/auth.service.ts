import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as  bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
          private userRepository: Repository<User>,
  ){}

  async registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword , 5)
      const user = this.userRepository.save(createUserDto);
      return user;
  }

  async loginUser(createUserDto : CreateUserDto){
    const user = await this.userRepository.findOne({
      where: {
        userEmail: createUserDto.userEmail
      }
    })
    if(!user){
    throw new NotFoundException();
    }
    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword);
    if(!match){
      throw new UnauthorizedException("No estas autorizado");
    }
    return user;
  } 

}
