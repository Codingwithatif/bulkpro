import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => User, (user) => user.companies)
  owner: User;
}
