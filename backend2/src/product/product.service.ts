
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

  async create(createCatDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(CreateProductDto)
  }

  async findAll(): Promise<Product[]> {
    const product = await this.productModel.find().exec()
    return product
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id })
    if (!product) throw new NotFoundException("product not found")
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.findOne({ _id: id })
    if (!product) throw new NotFoundException("product not found")
    return this.productModel.updateOne({ id }, updateProductDto)
  }

  async remove(id: number) {
    const product = await this.productModel.findOne({ _id: id })
    if (!product) throw new NotFoundException("product not found")
    return this.productModel.deleteOne({ id })
  }
}
