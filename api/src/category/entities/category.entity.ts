import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories') // Table name in the database
export class Category {
  @PrimaryGeneratedColumn('uuid') // Auto-generate unique UUID
  id: string; // UUIDs are strings, not numbers

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
