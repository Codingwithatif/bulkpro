import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UUID } from 'crypto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() createCategoryDto: any) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get("getAllCategories")
  async findAll(@Query('user') user: any) {
    return this.categoryService.findAllCategoriesForSpeceficUser(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: UUID) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: UUID, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: UUID) {
    return this.categoryService.remove(id);
  }
}
