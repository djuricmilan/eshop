import {Entity, PrimaryGeneratedColumn, Column, EntitySchemaRelationOptions, OneToOne, OneToMany} from 'typeorm';
import {Length, IsNotEmpty, IsEmail, ValidateNested, IsEnum} from 'class-validator';
import { ShippingAddress } from './ShippingAddress';
import { ShoppingCart } from './ShoppingCart';
import { Role } from './role';
import { PurchaseOrder } from './PurchaseOrder';
import bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/auth';
@Entity()
export class User{

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  @IsNotEmpty()
  username!: string

  @Column()
  @Length(4, 100) //the rule is for the unencrypted password
  @IsNotEmpty()
  password!: string;

  @Column()
  @IsNotEmpty()
  @IsEnum(Role)
  role!: Role;

  @Column({unique: true})
  @IsEmail()
  email!: string;

  @Column(type => ShippingAddress)
  shippingAddress?: ShippingAddress;

  //cascade: true means that user.shoppingCart = sc; userRepository.save(user) will also save sc
  @OneToOne(type => ShoppingCart, shoppingCart => shoppingCart.user, {cascade: true})
  shoppingCart!: ShoppingCart

  @OneToMany(type => PurchaseOrder, purchaseOrders => purchaseOrders.user, {cascade: true})
  @ValidateNested()
  purchaseOrders!: PurchaseOrder[];

  checkUnencryptedPassword(unencryptedPassword: string){
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  encryptPassword(){
    this.password = bcrypt.hashSync(this.password, 8);
  }

  initializeFromDto(body: RegisterDto) {
    this.username = body.username;
    this.password = bcrypt.hashSync(body.password, 8);
    this.email = body.email;
    this.shippingAddress = body.shippingAddress;
    this.role = body.role;
  }

}