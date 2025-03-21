import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiAuth } from './decorators/api.decorator';
import { Response } from 'express';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './decorators/cookies.decorator';

@ApiAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  singup(@Body() createUserDto: CreateUserDto){
    return this.authService.registerUser(createUserDto);
  }

  
  @Post("login")
  async login(@Body() loginUserDto: LoginUserDto , @Res({passthrough: true}) response: Response,@Cookies() cookies:any){
    const token = await this.authService.loginUser(loginUserDto);
    
    response.cookie(TOKEN_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,

    })
    return token;
  }

  @Patch("/user/:email")
  updateUser(@Param("email") email:string, @Body() updateUserDto : UpdateUserDto ){
    return this.authService.updateUser(email, updateUserDto);
  }
}
