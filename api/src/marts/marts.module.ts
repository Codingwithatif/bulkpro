import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MartsService } from './marts.service';
import { MartsController } from './marts.controller';
import { Mart } from './mart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mart])], // Registers Mart entity for TypeORM
  providers: [MartsService],
  controllers: [MartsController],
  exports: [MartsService], // Allows the service to be used in other modules
})
export class MartsModule {}
