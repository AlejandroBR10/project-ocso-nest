import {  IsEmail, IsObject, IsOptional, isString, IsString, IsUUID, MaxLength } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { User } from "src/auth/entities/user.entity";
import { Type } from "class-transformer";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmployeeDto {
  @ApiProperty()
      @IsString()
        @IsUUID("4")
        @IsOptional()
        @MaxLength(30)
        employeeId: string;

        @ApiProperty()
        @IsString()
        @MaxLength(30)
        employeeName : string;

        @ApiProperty()
        @IsString()
        @MaxLength(70)
        employeeLastName: string;

        @ApiProperty()
        @IsString()
        @MaxLength(10)
        employeePhoneNumber : string;

        @ApiProperty()
        @IsEmail()
        employeeEmail: string;

        @ApiProperty()
        @IsString()
        @MaxLength(200)
        employeePhoto : string;

        @ApiPropertyOptional()
        @IsOptional()
        @IsObject()
        location : Location
}

