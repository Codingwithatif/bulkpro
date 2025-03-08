import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' }) // Custom error message
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
