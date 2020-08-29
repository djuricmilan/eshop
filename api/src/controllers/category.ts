import {Request, Response} from 'express';
import { CustomCategoryResponse } from '../dto/category';
import CategoryService from '../services/category';

class CategoryController{
  public async getAll(request: Request, response: Response){
    const retval: CustomCategoryResponse = await CategoryService.getAll();
    response.status(retval.status).send(retval);
  }

  public async getOne(request: Request, response: Response){
  }

  public async create(request: Request, response: Response){

  }

  public async update(request: Request, response: Response){

  }

  public async delete(request: Request, response: Response){

  }
}

export default new CategoryController();