import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Store } from 'src/store/entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Store])], // Registers User entity for TypeORM
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule], // Allows UserService & User entity to be used in other modules
})
export class UserModule {}
