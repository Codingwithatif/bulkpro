import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Mart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => User, (user) => user.marts)
  owner: User;

  @OneToMany(() => Product, (product) => product.mart)
  products: Product[];
}
