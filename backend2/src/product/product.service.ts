
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

  async create(CreateProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(CreateProductDto)
  }

  async findAll(data: any): Promise<Product[]> {
    // const product = await this.productModel.find().exec()
    return data
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel. find ()
    const foundedProduct = product. find((item) => item.id === id) 
    if (!foundedProduct) throw new NotFoundException ("productnot found")
    return foundedProduct
    }

  async update(data: any) {
    const product = await this.productModel.find()
    const foundedProduct = product.find((item) => item.id === +item.id)
    if (!foundedProduct) throw new NotFoundException("product not found")
    await this.productModel.updateOne({ _id: foundedProduct._id }, data);
    return { message: "Product updated" }
  }

  async remove (id: number) {
    const product = await this.productModel. find()
    const foundedProduct = product. find ((item) => item.id === +id)
    if (!foundedProduct) throw new NotFoundException ("product not found")
    return this.productModel.deleteOne({ _id: foundedProduct._id })
  }
}
