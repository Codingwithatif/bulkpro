// // src/category/category.controller.ts
// import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
// import { CategoryService } from './category.service';
// import { Category } from './entities/category.entity';

// @Controller('categories')
// export class CategoryController {
//   constructor(private readonly categoryService: CategoryService) {}

//   @Post("createCategory")
//   async createCategory(@Body() categoryData: Partial<Category>): Promise<Category> {
//     console.log('contorller');
    
//     return this.categoryService.createCategory(categoryData);
//   }
  

//   @Get()
//   async getCategories(): Promise<Category[]> {
//     return this.categoryService.getCategories();
//   }

//   @Put(':id')
//   async updateCategory(
//     @Param('id') id: number,
//     @Body() categoryData: Partial<Category>,
//   ): Promise<Category> {
//     return this.categoryService.updateCategory(id, categoryData);
//   }

//   @Delete(':id')
//   async deleteCategory(@Param('id') id: number): Promise<void> {
//     return this.categoryService.deleteCategory(id);
//   }
// }


import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('marts/:martId/categories') // Updated route to include martId
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Param('martId') martId: string, // Accept martId as param
    @Body() categoryData: Partial<Category>
  ): Promise<Category> {
    const numericMartId = parseInt(martId, 10);
    return this.categoryService.createCategory(numericMartId, categoryData);
  }

  @Get()
  async getCategories(@Param('martId') martId: string): Promise<Category[]> {
    const numericMartId = parseInt(martId, 10);
    return this.categoryService.getCategories(numericMartId);
  }

  @Put(':id')
  async updateCategory(
    @Param('martId') martId: string,
    @Param('id') id: string,
    @Body() categoryData: Partial<Category>,
  ): Promise<Category> {
    const numericMartId = parseInt(martId, 10);
    const numericId = parseInt(id, 10);
    return this.categoryService.updateCategory(numericMartId, numericId, categoryData);
  }

  @Delete(':id')
  async deleteCategory(
    @Param('martId') martId: string,
    @Param('id') id: string
  ): Promise<void> {
    const numericMartId = parseInt(martId, 10);
    const numericId = parseInt(id, 10);
    return this.categoryService.deleteCategory(numericMartId, numericId);
  }
}
