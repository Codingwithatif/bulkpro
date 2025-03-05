import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mart } from './mart.entity';

@Injectable()
export class MartsService {
  constructor(
    @InjectRepository(Mart)
    private readonly martRepository: Repository<Mart>,
  ) {}

  async createMart(name: string, ownerId: string): Promise<Mart> {
    const mart = this.martRepository.create({ name, owner: { id: ownerId } });
    return await this.martRepository.save(mart);
  }

  async getAllMarts(): Promise<Mart[]> {
    return await this.martRepository.find({ relations: ['owner', 'products'] });
  }

  async getMartById(id: string): Promise<Mart> {
    const mart = await this.martRepository.findOne({ where: { id }, relations: ['owner', 'products'] });
    if (!mart) {
      throw new NotFoundException(`Mart with id ${id} not found`); // Handle null case
    }
    return mart;
  }

  async updateMart(id: string, name: string): Promise<Mart> {
    await this.martRepository.update(id, { name });
    return this.getMartById(id); // Ensure the mart exists
  }

  async deleteMart(id: string): Promise<void> {
    await this.martRepository.delete(id);
  }
}
