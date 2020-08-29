import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Category{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  @IsNotEmpty()
  name!: string;
}