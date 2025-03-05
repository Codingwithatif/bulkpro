import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MartsModule } from './marts/marts.module';
import { ProductsModule } from './products/products.module';


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
    MartsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
