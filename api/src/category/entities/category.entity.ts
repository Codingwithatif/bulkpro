import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

//   @ManyToOne(() => Mart, (mart) => mart.categories, { nullable: true, onDelete: 'CASCADE' })
//   mart?: Mart;

//   @ManyToOne(() => Company, (company) => company.categories, { nullable: true, onDelete: 'CASCADE' })
//   company?: Company;
}
