/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { UUID } from 'crypto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private categorySvc: CategoryService
  ) {}

  // Create a new product
  async create(createProductDto: any) {
    console.log('Received Data:', createProductDto); // 🛠 Debug log

    if (!createProductDto || !createProductDto.name || !createProductDto.price || !createProductDto.categoryId) {
      console.error('Missing Fields:', createProductDto); // Log missing data
      throw new BadRequestException('Product name, price, and category are required');
    }

    const category = await this.categorySvc.findOne(createProductDto.categoryId);
    if (!category) {
      throw new BadRequestException(`Category with ID ${createProductDto.categoryId} not found`);
    }

    const newProduct = this.productRepository.create({
      ...createProductDto,
      category: category.data, // Attach product to category
    });

    await this.productRepository.save(newProduct);

    return {
      statusCode: 201,
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  async findAll(ownerId: string) {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category')
      .innerJoinAndSelect('category.owner', 'owner') // Join with owner (mart or company)
      .where('category.owner.id = :ownerId', { ownerId }) // Filter by owner ID
      .getMany();
  
    return {
      statusCode: 200,
      message: 'Products retrieved successfully',
      data: products,
    };
  }

  // Get a single product by ID
  async findOne(id: UUID) {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  // Update a product
  async update(id: UUID, updateProductDto: any) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (updateProductDto.categoryId) {
      const category = await this.categorySvc.findOne(updateProductDto.categoryId);
      if (!category) {
        throw new BadRequestException(`Category with ID ${updateProductDto.categoryId} not found`);
      }
      product.category = category.data;
    }

    await this.productRepository.save(product);

    return {
      statusCode: 200,
      message: 'Product updated successfully',
      data: product,
    };
  }

  // Delete a product
  async remove(id: UUID) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.remove(product);

    return {
      statusCode: 200,
      message: 'Product deleted successfully',
    };
  }
}
