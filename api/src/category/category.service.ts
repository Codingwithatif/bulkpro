/* eslint-disable @typescript-eslint/no-unused-vars */

import {  Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(numericMartId: number, categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    console.log("service");
    
    return this.categoryRepository.save(category);
    
  }

  async getCategories(numericMartId: number): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['mart', 'company'] });
  }

  async updateCategory(id: number, numericId: number, categoryData: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, categoryData);
    return this.categoryRepository.findOneOrFail({ where: { id } });
  }

  async deleteCategory(id: number, numericId: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
