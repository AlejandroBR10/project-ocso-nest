import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { Provider } from 'src/providers/entities/provider.entity';

@ApiAuth()
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
      status: 201,
      example: {
        productId:  "UUID",
        productName : "Coca Cola 600ml",
        price : 15,
        countSeal : 3,
      } as Product
    })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route return ALL existing products on the DB"
    }
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route return the specific product with the corresponding ID"
    }
  })
  @Get(':id')
  findOne(@Param('id' , new ParseUUIDPipe({version : '4'})) id: string) {
    return this.productsService.findOne(id);
  }

  @Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route return the products with the corresponding PROVIDER"
    }
  })
  @Get('provider/:id')
  findByProvider(@Param('id' , new ParseUUIDPipe({version : '4'})) id: string){
    return this.productsService.findByProvider(id);
  }

  @Auth(ROLES.EMPLOYEE , ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route update the product with the corresponding ID"
    }
  })
  @Patch(':id')
  update(@Param('id' , new ParseUUIDPipe({version : '4'})) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
     message :"This route remove the product with the corresponding ID"
    }
  })
  @Delete(':id')
  remove(@Param('id' , new ParseUUIDPipe({version: '4'})) id: string) {
    return this.productsService.remove(id);
  }
}
