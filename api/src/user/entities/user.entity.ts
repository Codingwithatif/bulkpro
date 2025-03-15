
import { Entity, Column, OneToMany } from 'typeorm';

import { UserRole } from '../dto/user.model';
import { Base } from 'src/universal/entities/base.entity';
import { Category } from 'src/category/entities/category.entity';
@Entity()
export class User extends Base {

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ type: 'text', nullable: true })
  role: UserRole;
 
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Category, (category) => category.products )
  category: Category[];
  
}