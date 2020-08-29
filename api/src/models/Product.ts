import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { IsNotEmpty, Length, isNotEmpty } from "class-validator";
import { Category } from "./Category";

@Entity()
export class Product{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  @Length(2, 50)
  productName!: string;

  @Column({length: '5000'})
  @Length(2, 5000)
  productDescription!: string;

  @Column({default: 1})
  @IsNotEmpty()
  availability!: number;

  @Column()
  @IsNotEmpty()
  price!: number;

  @ManyToMany(type => Category)
  @JoinTable()
  categories!: Category[];
}