import { IsEmail, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";

export class CreateManagerDto {
    /*@IsUUID()
    @IsString()
    managerId : string;*/
    @IsString()
    @MaxLength(80)
    managerFullName : string;
    @IsNumber()
    managerSalary: number;
    @IsEmail()
    managerEmail : string;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber : string;
    @IsObject()
    @IsOptional()
    location : Location;
    
}
