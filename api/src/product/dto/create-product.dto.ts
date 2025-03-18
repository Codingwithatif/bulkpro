
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  quantity?: number; // Optional with default value

  @IsNumber()
  @IsOptional()
  thresholdLimit?: number; // Optional with default value
  
  @IsOptional()
  @IsString()
  code?: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string; // Ensure categoryId is a valid UUID
}
