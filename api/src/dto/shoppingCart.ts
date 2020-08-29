import {ShoppingCart} from '../models/ShoppingCart';

export interface ShoppingCartDto{
  success: boolean,
  status: number,
  shoppingCart?: ShoppingCart,
  message?: string
}