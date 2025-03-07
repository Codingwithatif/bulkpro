/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateMartDto } from './dto/create-mart.dto';
import { UpdateMartDto } from './dto/update-mart.dto';

@Injectable()
export class MartService {
  create(createMartDto: CreateMartDto) {
    return 'This action adds a new mart';
  }

  findAll() {
    return `This action returns all mart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mart`;
  }

  update(id: number, updateMartDto: UpdateMartDto) {
    return `This action updates a #${id} mart`;
  }

  remove(id: number) {
    return `This action removes a #${id} mart`;
  }
}
