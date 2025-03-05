import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MartsService } from './marts.service';
import { Mart } from './mart.entity';

@Controller('marts')
export class MartsController {
  constructor(private readonly martsService: MartsService) {}

  @Post()
  async createMart(
    @Body() createMartDto: { name: string; ownerId: string },
  ): Promise<Mart> {
    const { name, ownerId } = createMartDto;
    return await this.martsService.createMart(name, ownerId);
  }

  @Get()
  async getAllMarts(): Promise<Mart[]> {
    return await this.martsService.getAllMarts();
  }

  @Get(':id')
  async getMartById(@Param('id') id: string): Promise<Mart> {
    return await this.martsService.getMartById(id);
  }

  @Put(':id')
  async updateMart(
    @Param('id') id: string,
    @Body() updateMartDto: { name: string },
  ): Promise<Mart> {
    const { name } = updateMartDto;
    return await this.martsService.updateMart(id, name);
  }

  @Delete(':id')
  async deleteMart(@Param('id') id: string): Promise<{ message: string }> {
    await this.martsService.deleteMart(id);
    return { message: `Mart with ID ${id} has been deleted.` };
  }
}
