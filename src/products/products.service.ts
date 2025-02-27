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
  private products : CreateProductDto[] = [{
      productId : uuidv4(),
      productName : 'Sabritas Normal 48g',
      price : 20,
      countSeal : 3,
      provider : uuidv4(),
  },
  {
    productId : uuidv4(),
    productName : 'Coca Cola 600ml',
    price : 40,
    countSeal : 2,
    provider : uuidv4(),
  },
  {
    productId : uuidv4(),
    productName : 'Agua Ciel 1L',
    price : 15,
    countSeal : 2,
    provider : uuidv4(),
  }
];
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

       findOne(productId: string){
        const product = this.productRepository.findOneBy({ productId });
      
        if (!product) {
          throw new NotFoundException();
        }
    
        return product;
      }
      


  findByProvider(id: string){
    const productProvider = this.products.filter((product) => product.provider  === id);
    if(productProvider.length === 0) throw new NotFoundException();
    return productProvider;

  }

  /*update(id: string, updateProductDto: UpdateProductDto) {
    let productToUpdate = this.findOne(id);
    productToUpdate = { 
      ...productToUpdate,
       ...updateProductDto };
    this.products = this.products.map((product) => {
      if(product.productId === id){
        product = productToUpdate;
      }
      return product;
    });
    return productToUpdate;
  }*/


  /*remove(id: string) {
    const product = this.findOne(id);
    this.products = this.products.filter((product) => product.productId != id);

    return this.products;
  }*/

    async remove(id: string): Promise<void> {
      await this.productRepository.delete(id);
    }
}
