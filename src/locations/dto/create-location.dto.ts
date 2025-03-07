import { Region } from "src/regions/entities/region.entity";
import {Location} from "../entities/location.entity"

import { ArrayNotEmpty, IsArray, IsObject, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateLocationDto {
@IsString()
@MaxLength(35)
 locationName: string;
 @IsString()
 @MaxLength(160)
 locationAddress: string;
 @IsArray()
 @ArrayNotEmpty()
 locationLatLng: number[];
 @IsObject()
 @IsOptional()
 region : Region;
}
