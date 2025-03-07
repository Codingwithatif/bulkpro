/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { MartModule } from './mart/mart.module';
import { CompanyModule } from './company/company.module';
import { Category } from './category/entities/category.entity';
import { Mart } from './mart/entities/mart.entity';  

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './_db/bulkpro.sqlite',  // SQLite file
      entities: [],
      synchronize: true,  // Auto syncs DB schema (disable in production)
      autoLoadEntities: true
    }),
    UserModule,
    CategoryModule,
    ProductModule,
    MartModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
