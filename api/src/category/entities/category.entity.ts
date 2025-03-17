import { Product } from 'src/product/entities/product.entity';
import { Base } from 'src/universal/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('categories') // Table name in the database
export class Category extends Base {

  @Column({ type: 'varchar', length: 255 }) // ❌ Removed unique constraint on name
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Product, (product) => product.category) // ✅ One category can have many products
  products: Product[];

  @ManyToOne(() => User, (user) => user.category, { onDelete: 'CASCADE' }) // ✅ Many categories belong to one user
  user: User;
}
