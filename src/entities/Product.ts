import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
  
  @Column()
  name!: string;

  @Column('decimal')
  price!: number;

  @Column()
  description!: string;

  @ManyToOne(() => User, user => user.products)
  user!: User;


}
