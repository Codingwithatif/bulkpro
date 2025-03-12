
import { Entity, Column, OneToOne } from 'typeorm';

import { UserRole } from '../dto/user.model';
import { Base } from 'src/universal/entities/base.entity';
import { Store } from 'src/store/entities/store.entity';
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

  // @OneToMany(() => Product, (prod) => prod.user)
  // product: any;

  @OneToOne(() => Store, (store) => store.storeOwner)
  store: Store;
}