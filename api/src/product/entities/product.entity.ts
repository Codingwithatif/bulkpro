/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Base } from 'src/universal/entities/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column('int')
  stock: number;


  @OneToMany(() => Product, (product) => product)
  products: Product[];
}

