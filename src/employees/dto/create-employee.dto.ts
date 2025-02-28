import {  IsEmail, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
export class CreateEmployeeDto {
      @IsString()
        @IsUUID("4")
        @IsOptional()
        employeeId : string;
        @IsString()
        @MaxLength(30)
        name : string;
        @IsString()
        @MaxLength(70)
        lastName: string;
        @IsString()
        @MaxLength(10)
        phoneNumber : string;
        @IsEmail()
        email: string;
    
}
