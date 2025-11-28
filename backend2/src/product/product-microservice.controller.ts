import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('product')
export class ProductMikroserviceController {
    constructor(private readonly productService: ProductService) { }

    @EventPattern("findAll")
    getHelloFromOtherService(data: any) {
        return this.productService.findAll(data)
    }


    @EventPattern("created")
    create(@Payload() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto)
    }


    @EventPattern("findOne")
    async findOne(@Payload() id: string) {
        const product = await this.productService.findOne(+id)
        return product
    }

    @EventPattern("update")
    update(@Payload() data: any) {
        return this.productService.update(data);
    }


    @EventPattern('delete')
    remove(@Payload() id: string) {
        return this.productService.remove(+id)
    }
}
