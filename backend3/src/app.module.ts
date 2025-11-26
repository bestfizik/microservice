import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      host: "localhost",
      port: 5432,
      database: "microservice2",
      password: "bestfizik05",
      synchronize: true,
      autoLoadEntities: true
    }),
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
