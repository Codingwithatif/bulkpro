import { Product } from 'src/product/entities/product.entity';
import { Base } from 'src/universal/entities/base.entity';
import { Entity, Column, OneToOne } from 'typeorm';

@Entity('categories') // Table name in the database
export class Category extends Base {

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

   @OneToOne(() => Product, (product) => product.categories )
    products: Product
}
