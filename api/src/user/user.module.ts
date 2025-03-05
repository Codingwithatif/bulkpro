import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Registers User entity for TypeORM
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule], // Allows UserService & User entity to be used in other modules
})
export class UserModule {}
