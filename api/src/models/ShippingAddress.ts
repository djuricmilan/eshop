import { Column } from "typeorm";
import { IsNotEmpty } from "class-validator";

export class ShippingAddress{
  @Column({nullable: true})
  country!: string;

  @Column({nullable: true})
  city!: string;

  @Column({nullable: true})
  street!: string;

  @Column({nullable: true})
  postalCode!: string;
}