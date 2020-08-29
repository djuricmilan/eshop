import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { ShippingAddress } from "./ShippingAddress";
import { ValidateNested, MinLength } from "class-validator";
import { ProductItem } from "./ProductItem";
import { User } from "./User";

@Entity()
export class PurchaseOrder{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column(type => ShippingAddress)
  @ValidateNested()
  shippingAddress!: ShippingAddress;

  @OneToMany(type => ProductItem, productItems => productItems.purchaseOrder)
  @MinLength(1, {each: true})
  productItems!: ProductItem[];

  @ManyToOne(type => User, user => user.purchaseOrders, {onDelete: 'CASCADE'})
  user!: User;
}