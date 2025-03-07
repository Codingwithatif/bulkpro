
import { Category } from 'src/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Mart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => Category, (category) => category)
  categories: Category[];
}
