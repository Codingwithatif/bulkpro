
import { Category } from 'src/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  industry: string;

  @OneToMany(() => Category, (category) => category)
  categories: Category[];
}
