
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { UserRole } from '../dto/user.model';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}
