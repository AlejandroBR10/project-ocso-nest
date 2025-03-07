import {  IsEmail, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { User } from "src/auth/entities/user.entity";
import { Type } from "class-transformer";
import { Location } from "src/locations/entities/location.entity";
export class CreateEmployeeDto {
      @IsString()
        @IsUUID("4")
        @IsOptional()
        @MaxLength(30)
        employeeId: string;
        @IsString()
        @MaxLength(30)
        employeeName : string;
        @IsString()
        @MaxLength(70)
        employeeLastName: string;
        @IsString()
        @MaxLength(10)
        employeePhoneNumber : string;
        @IsEmail()
        employeeEmail: string;
        @IsOptional()
        @IsObject()
        location : Location
  
    
}
