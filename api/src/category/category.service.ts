/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { UUID } from 'crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CategoryService {
  [x: string]: any;
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private userSvc: UserService
  ) {}

  // Create a new category
  async create(createCategoryDto: any) {
    console.log('Received Data:', createCategoryDto); // 🛠 Debug log

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!createCategoryDto || !createCategoryDto.name) {
      throw new BadRequestException('Category name is required');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = await this.userSvc.findUserByEmail(createCategoryDto.user.email);
    if(!user) {
      return null
    }

    const newCategory = this.categoryRepository.create({
      ...createCategoryDto,
      user,
    });
    
    await this.categoryRepository.save(newCategory);

    return {
      statusCode: 201,
      message: 'Category created successfully',
      data: newCategory,
    };
  }

  // Get all categories
  async findAllCategoriesForSpeceficUser(data: any) {
    const user = await this.userSvc.findUserByEmail(data);
    if(!user) {
      return null;
    }
    
    const categories = await this.categoryRepository.find({ 
      where: { user: { id: user.id} }, 
      relations: ['user']
    });

    return {
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: categories,
    };
  }

  // Get a single category by ID
  async findOne(id: UUID) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Category retrieved successfully',
      data: category,
    };
  }

  // Update a category
  async update(id: UUID, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.preload({
      id,
      ...updateCategoryDto,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.categoryRepository.save(category);

    return {
      statusCode: 200,
      message: 'Category updated successfully',
      data: category,
    };
  }

  // Delete a category
  async remove(id: UUID) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.categoryRepository.remove(category);

    return {
      statusCode: 200,
      message: 'Category deleted successfully',
    };
  }
}
