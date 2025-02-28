import { Optional } from "@nestjs/common";
import { Provider } from "src/providers/entities/provider.entity";
import { text } from "stream/consumers";
import { Entity, Column , PrimaryGeneratedColumn, ManyToOne } from "typeorm";
@Entity()
export class Product {
        @PrimaryGeneratedColumn("uuid")
        productId : string;
       @Column({type: "text"})
        productName : string;
        @Column({type : "float"})
        price: number;
        @Column({type:"int"})
        countSeal : number;
       @ManyToOne(() => Provider, (provider) => provider.products)
       provider: Provider
}