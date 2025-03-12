import { Product } from 'src/product/entities/product.entity';
import { Base } from 'src/universal/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Store extends Base {
  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product)
  products: Product[];
}
