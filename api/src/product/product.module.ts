import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { CategoryModule } from 'src/category/category.module'; // ✅ Import CategoryModule
import { CategoryService } from 'src/category/category.service'; // ✅ Import CategoryService
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, User]),
    CategoryModule, // ✅ Import CategoryModule to get CategoryService
  ],
  controllers: [ProductController],
  providers: [ProductService, UserService, CategoryService], // ✅ Add CategoryService as a provider
  exports: [ProductService],
})
export class ProductModule {}
