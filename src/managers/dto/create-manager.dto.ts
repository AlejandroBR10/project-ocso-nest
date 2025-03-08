import { IsEmail, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateManagerDto {
    /*@IsUUID()
    @IsString()
    managerId : string;*/
    @ApiProperty()
    @IsString()
    @MaxLength(80)
    managerFullName : string;
    @ApiProperty()
    @IsNumber()
    managerSalary: number;
    @ApiProperty()
    @IsEmail()
    managerEmail : string;
    @ApiProperty()
    @IsString()
    @MaxLength(16)
    managerPhoneNumber : string;
    @ApiProperty()
    @IsObject()
    @IsOptional()
    location : Location;
    
}
