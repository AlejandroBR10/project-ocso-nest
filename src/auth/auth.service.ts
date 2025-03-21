import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as  bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
          private userRepository: Repository<User>,
          private  jwtService: JwtService
  ){}

  async registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword , 5)
      const user = this.userRepository.save(createUserDto);
      return user;
  }

  async loginUser(loginUserDto : LoginUserDto){
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail
      },
    });
    
    if(!user) throw new UnauthorizedException("No estas autorizado");
    
    const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword);
   
    if(!match)throw new UnauthorizedException("No estas autorizado");
      const payload = {
        userEmail : user.userEmail,
        userPassword : user.userPassword,
        userRoles: user.userRoles
    };
    const token = this.jwtService.sign(payload);
    return token;
  } 

  async updateUser(email: string, updateUserDto: UpdateUserDto){    
   const newUserData =  await this.userRepository.preload({
      userId: email, 
      ...updateUserDto
    })
    if(!newUserData){
      throw new NotFoundException("No se encontro el usuario");
    }
    this.userRepository.save(newUserData);
    return newUserData;
  }

}
