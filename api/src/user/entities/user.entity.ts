/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // @Column()
  // name: string;

 

  // @Column({ nullable: true })
  // address?: string;

  // @Column({ nullable: true })
  // phoneNumber?: string;

  // @Column({ default: true })
  // isActive: boolean;

}
