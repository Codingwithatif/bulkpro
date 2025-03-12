/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Category } from 'src/category/entities/category.entity';
import { Store } from 'src/store/entities/store.entity';
import { Base } from 'src/universal/entities/base.entity';
import { Entity, Column, ManyToOne, OneToOne } from 'typeorm';

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

  @ManyToOne(() => Store, (store) => store.storeOwner)
  store: Store;

  @OneToOne(() => Category, (category) => category.products )
  categories: Category
}

