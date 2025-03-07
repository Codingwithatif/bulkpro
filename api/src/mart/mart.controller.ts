/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Param, Post, Body } from '@nestjs/common';

@Controller('marts') // ✅ Defines the '/marts' route
export class MartController {
  
  @Get()
  getAllMarts() {
    return [{ id: 1, name: 'Example Mart' }]; // Sample response
  }

  @Get(':martId/categories')
  getCategories(@Param('martId') martId: number) {
    return { martId, categories: ['Category 1', 'Category 2'] }; // Sample response
  }

  @Post()
  createMart(@Body() martData: any) {
    return { message: 'Mart created successfully', mart: martData };
  }
}
