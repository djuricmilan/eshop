import { CustomCategoryResponse } from "../dto/category";
import { getRepository } from "typeorm";
import { Category } from "../models/Category";

class CategoryService{
  public async getAll(): Promise<CustomCategoryResponse>{
    const categoryRepository = getRepository(Category);
    try{
      let retval = await categoryRepository.find({});
      return{
        success: true,
        status: 200,
        categories: retval
      }
    }catch{
      return {
        success: false,
        status: 500
      };
    }
  }
}

export default new CategoryService();