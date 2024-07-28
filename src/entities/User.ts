import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Product } from './Product';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Product, product => product.user)
  products!: Product[];

  
}
