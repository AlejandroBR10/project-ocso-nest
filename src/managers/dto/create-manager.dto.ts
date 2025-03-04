import { IsEmail, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";

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
    
}
