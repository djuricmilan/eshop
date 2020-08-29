import {Request, Response} from 'express';
import ProductService from '../services/product';
import { CustomProductResponse } from '../dto/product';

class ProductController{
  public async getAll(request: Request, response: Response){
    const quantity = request.query.quantity;
    const chunkIndex = request.query.chunkIndex;
    const lowerPrice = request.query.lowerPrice;
    const upperPrice = request.query.upperPrice;
    let categoryNames: string[] = [];
    if(request.query.categoryNames)
      categoryNames = (<string>request.query.categoryNames).split(',');

    const retval: CustomProductResponse = await ProductService.getAll(quantity, chunkIndex, categoryNames, lowerPrice, upperPrice);
    response.status(retval.status).send(retval);
  }

  public async getMaxPrice(request: Request, response: Response){
    try{
      let retval = await ProductService.getMaxPrice();
      response.status(200).send({maxPrice: retval});
    }catch(error){
      response.status(500).send(error.message);
    }
  }

  public async create(request: Request, response: Response){

  }

  public async update(request: Request, response: Response){

  }

  public async delete(request: Request, response: Response){

  }
}

export default new ProductController();