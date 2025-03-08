import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;
    @ApiProperty({
                default: "Mexico, City"
            })
    @Column({
        type: "text",
        unique: true
    })
    regionName: string;
    @ApiProperty({
        default: ["12","44"]
    })
    @Column('simple-array')
    regionStates : string[];

    @OneToMany(() => Location, (location) => location.region)
        locations: Location[];
}
