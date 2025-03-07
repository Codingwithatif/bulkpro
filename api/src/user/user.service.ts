/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { IUser } from './dto/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(user: IUser) {
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User data not provided',
      };
    }

    const existingUser = await this.userRepo.findOne({ where: { email: user.email } });

    if (existingUser) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'User already exists',
      };
    }

    // Encrypt user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const newUser = this.userRepo.create(user);
    const result = await this.userRepo.save<User>(newUser);

    return {
      status: HttpStatus.OK,
      message: 'User registered successfully',
      data: result,
    };
  }

  async login(user: any) {
    const foundUser = await this.findUserByEmail(user.email);
    
    if (!foundUser) {
      throw new BadRequestException('Invalid credentials');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(user.password, foundUser.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      status: HttpStatus.OK,
      message: 'User found',
      data: foundUser,
    };
  }

  async findAll() {
    const users = await this.userRepo.find();
    return {
      status: HttpStatus.OK,
      message: 'All users retrieved successfully',
      data: users,
    };
  }

  async findUserByEmail(email: string) {
    if (!email) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto & { password?: string }) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // If password is being updated, hash it before saving
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    await this.userRepo.update(id, updateUserDto);
    const updatedUser = await this.userRepo.findOne({ where: { id } });

    return {
      status: HttpStatus.OK,
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepo.delete(id);
    return {
      status: HttpStatus.OK,
      message: `User with ID ${id} deleted successfully`,
    };
  }
}