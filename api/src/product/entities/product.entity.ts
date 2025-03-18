import { Category } from 'src/category/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert } from 'typeorm';
import * as JsBarcode from 'jsbarcode';
import { createCanvas } from 'canvas';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ nullable: true })
  code: string;

  
  @Column({ nullable: true })
  barcode: string; // ✅ Barcode will be stored here

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'CASCADE' })
  category: Category;

  // ✅ Generate barcode before inserting a new product
  @BeforeInsert()
  generateBarcode() {
    if (this.code) {
      const canvas = createCanvas(200, 100); // ✅ Specify dimensions
      JsBarcode(canvas, this.code, { format: 'CODE128', width: 2, height: 50 });
      this.barcode = canvas.toDataURL(); // ✅ Store barcode as Base64 image
    }
  }
}
