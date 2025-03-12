import { Product } from 'src/product/entities/product.entity';
import { Base } from 'src/universal/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, OneToOne, OneToMany } from 'typeorm';

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

  @OneToOne(() => User, (user) => user.store, {onDelete: 'CASCADE'})
  storeOwner: User;

  @OneToMany(() => Product, (product) => product.store)
  products: Product[];
}
