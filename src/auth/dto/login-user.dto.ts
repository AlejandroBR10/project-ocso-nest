import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        description: "user@gmail.com",
    })
    @IsString()
    @IsEmail()
    userEmail: string;
    @ApiProperty({
        description: "user123",
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
}