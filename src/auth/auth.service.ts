import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
          private userRepository: Repository<User>,
  ){}

  async registerUser(createUserDto: CreateUserDto){
      const user = this.userRepository.save(createUserDto);
      return user;
  }

}
