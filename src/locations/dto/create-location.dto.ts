import { Region } from "src/regions/entities/region.entity";
import {Location} from "../entities/location.entity"

import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLocationDto {
@ApiProperty()
@IsString()
@MaxLength(35)
 locationName: string;
 @ApiProperty()
 @IsString()
 @MaxLength(160)
 locationAddress: string;
 @ApiProperty()
 @IsArray()
 @ArrayNotEmpty()
 locationLatLng: number[];
 @ApiProperty()
 @IsObject()
 @IsOptional()
 region : Region;
 @IsUUID()
 @IsOptional()
 manager : string;
}
