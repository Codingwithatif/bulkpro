
import { Category } from 'src/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid') // ✅ Use UUID instead of number
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  quantity: number;

  @Column()
  thresholdLimit: number;


  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' }) // ✅ Ensures products are deleted if category is removed
  category: Category;
}
