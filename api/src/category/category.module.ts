// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CategoryService } from './category.service';
// import { CategoryController } from './category.controller';
// import { Category } from './entities/category.entity'; // Import the Category entity

// @Module({
//   imports: [TypeOrmModule.forFeature([Category])], // ✅ Register Category entity
//   providers: [CategoryService],
//   controllers: [CategoryController],
//   exports: [CategoryService], // ✅ If used in other modules
// })
// export class CategoryModule {}





// src/category/category.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
