import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ProductMikroserviceController } from './product-microservice.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ProductController,ProductMikroserviceController],
  providers: [ProductService],
})
export class ProductModule {}
