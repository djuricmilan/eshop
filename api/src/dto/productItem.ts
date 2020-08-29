import { ProductItem } from "../models/ProductItem";

export interface ProductItemPostDto{
  productId: number,
  amount: number
}

export interface ProductItemDto{
  success: boolean,
  status: number,
  productItem?: ProductItem,
  message?: string
}