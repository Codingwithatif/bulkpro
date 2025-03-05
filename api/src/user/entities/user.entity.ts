/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mart } from '../marts/mart.entity';  // Correct import path for Mart entity

export enum UserRole {
  MART = 'mart',
  COMPANY = 'company',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ default: true })
  isActive: boolean;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @OneToMany(() => Mart, (mart: Mart) => mart.owner, { cascade: true })
  marts: Mart[] | null; // Allow null
}
