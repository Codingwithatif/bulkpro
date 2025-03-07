import { Module } from '@nestjs/common';
import { MartService } from './mart.service';
import { MartController } from './mart.controller';

@Module({
  controllers: [MartController],
  providers: [MartService],
})
export class MartModule {}
