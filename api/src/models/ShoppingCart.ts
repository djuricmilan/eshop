import { Entity, OneToOne, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { ProductItem } from "./ProductItem";
import { ValidateNested } from "class-validator";

@Entity()
export class ShoppingCart{
  //JoinColumn means that shoppngCart table will have userId as foreign key
  @PrimaryColumn()
  userId!: number;

  @OneToOne(type => User, user => user.shippingAddress, {onDelete: "CASCADE"})
  @JoinColumn()
  user!: User;

  //unidirectional many to many relationship
  @OneToMany(type => ProductItem, productItems => productItems.shoppingCart, {cascade: true})
  @ValidateNested()
  productItems!: ProductItem[];
}