import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  martId?: number;

  @IsOptional()
  @IsNumber()
  companyId?: number;
}
