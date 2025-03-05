
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Mart } from '../marts/mart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int', { default: 0 })
  quantity: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Mart, (mart) => mart.products, { onDelete: 'CASCADE' })
  mart: Mart;
}
