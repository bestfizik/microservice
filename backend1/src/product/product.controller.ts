import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject("PRODUCT_SERVICE") private readonly clientService: ClientProxy
  ) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    this.clientService.emit("created", product)
    return product
  }

  @Get()
  findAll() {
    const products = this.productService.findAll()
    this.clientService.emit("findAll", products)
    return products
  }

  @Get(':id')
  findone(@Param('id') id: string) {
    this.clientService.emit("findone", id)
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.update(+id, updateProductDto);
    this.clientService.emit("update", { id, ...updateProductDto })
    return product
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.clientService.emit("delete", id)
    return this.productService.remove(+id);
  }
}
