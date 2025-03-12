
import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;  // Ensure this matches DTO

  @IsUUID()
  @IsOptional()
  categoryId?: string; 

  user: any;
}
