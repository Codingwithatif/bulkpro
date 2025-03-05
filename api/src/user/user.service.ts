import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: any) {
    if (!createUserDto) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Invalid data',
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newUser = this.userRepo.create(createUserDto);
    const result = await this.userRepo.save(newUser);

    return {
      status: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: result,
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

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      status: HttpStatus.OK,
      message: 'User retrieved successfully',
      data: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
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
