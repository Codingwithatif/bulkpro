
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsUUID()
  categoryId: string;
}
