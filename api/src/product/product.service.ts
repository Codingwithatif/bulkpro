
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private userSvc: UserService
  ) {}

  // Create a new product
  async create(createProductDto: CreateProductDto) {
    console.log('Received Data:', createProductDto); // 🛠 Debug log

    if (!createProductDto || !createProductDto.name) {
      throw new BadRequestException('Product name is required');
    }

    const user = await this.userSvc.findUserByEmail(createProductDto.user)
    if(!user) {
      return null;
    }

    const newProduct = this.productRepository.create(createProductDto);
    await this.productRepository.save({...newProduct, user: user});

    return {
      statusCode: 201,
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  // Get all products
  async findAll() {
    const products = await this.productRepository.find();
    return {
      statusCode: 200,
      message: 'Products retrieved successfully',
      data: products,
    };
  }

  // Get a single product by ID
  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } });

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
  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.productRepository.save(product);

    return {
      statusCode: 200,
      message: 'Product updated successfully',
      data: product,
    };
  }

  // Delete a product
  async remove(id: string) {
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