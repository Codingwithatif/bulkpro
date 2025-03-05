/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(user: any) {
    if (!user) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'not found',
      };
    }

    const hello = await this.userRepo.findOne({ where : { email: user.email}});

    if(hello) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'already exist',
      };
    }

    // TODO: encypt and decrypt user

// const passtobenecypted = bufferCount.encryp(user.password)
//     user.passs = passtobenecypted;

    const newUser = this.userRepo.create(user);
    const result = await this.userRepo.save<User>(newUser);

    return {
      status: HttpStatus.OK,
      message: 'User registered successfully',
      data: result,
    };
  }

  async login(user: any) {
    const validate = await this.validateUser(user)
    if(!validate) {
      return {
        status: new BadRequestException('wrong credentials')
      }
    }

    return {
      status: HttpStatus.OK,
      message: 'user foiun'
    }
  }  

  async validateUser(user: any) {
    const found = await this.findOne(user.email);

    if(found.password === user.password) {
      return true
    }

    return false;
  }

  async findAll() {
    const users = await this.userRepo.find();
    return {
      status: HttpStatus.OK,
      message: 'All users retrieved successfully',
      data: users,
    };
  }

  async findOne(email: string) {
      if (!email) {
        throw new NotFoundException(`User with ID ${email} not found`);
      } 
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(`User with ID ${email} not found`);
    }
    return user;
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
