import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, ManyToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Product } from "./Product";
import { ShoppingCart } from "./ShoppingCart";
import { PurchaseOrder } from "./PurchaseOrder";

@Entity()
export class ProductItem{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({default: 1})
  @IsNotEmpty()
  amount!: number;

  @ManyToOne(type => ShoppingCart, shoppingCart => shoppingCart.productItems)
  @IsNotEmpty()
  shoppingCart?: ShoppingCart;

  @ManyToOne(type => PurchaseOrder, purchaseOrder => purchaseOrder.productItems, {nullable: true, onDelete: 'CASCADE'})
  purchaseOrder?: PurchaseOrder;

  //unidirectional relationship
  @ManyToOne(type => Product, {onDelete: "RESTRICT"})
  @IsNotEmpty()
  product!: Product;

}