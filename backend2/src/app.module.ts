import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://olmasbekfizik_db_user:6vo16AWqHEoOXTb8@cluster0.uxxowac.mongodb.net/?appName=Cluster0"),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
