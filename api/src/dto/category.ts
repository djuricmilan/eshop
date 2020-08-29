import { Category } from "../models/Category";

export interface CustomCategoryResponse{
  success: boolean,
  status: number,
  categories?: Category[]
}