import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuidv4} from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ){}
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    /*if(!createProductDto.productId)
    createProductDto.productId = uuidv4();
    this.products.push(createProductDto);*/
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  /*findOne(id: string):Promise<Product> {
   /* const product = this.products.filter((product)=>product.productId === id)[0];
        if(!product) throw new NotFoundException();
         return product;
         let aidi = parseInt(id);
      const product = this.productRepository.findOneBy({productId: parseInt(id)});
      return product;

  }*/

       findOne(id: string){
        const product = this.productRepository.findOneBy({ productId:id });
      
        if (!product) {
          throw new NotFoundException();
        }
    
        return product;
      }
      


  findByProvider(id: string){
    return "Ok"

  }

  async update(id: string, updateProductDto: UpdateProductDto) {
   const productToUpdate = await this.productRepository.preload({
    productId: id,
    ...updateProductDto

   });
   if(!productToUpdate) throw new NotFoundException();
      this.productRepository.save(productToUpdate);
      return productToUpdate;
   
  }

    async remove(id: string) {
      this.findOne(id);
      this.productRepository.delete({productId: id});
      return {
        message: `Objeto con el id:${id} eliminado correctamente`,
      }
    }
  }
