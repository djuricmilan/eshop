import { Product } from "../models/Product";

export interface CustomProductResponseLazy{
  success: boolean;
  status: number;
  products?: Product[],
  amount?: number,
  chunkIndex?: number
}

export interface CustomProductResponse{
  success: boolean;
  status: number;
  products?: Product[]
}