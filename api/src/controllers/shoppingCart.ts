import { Request, Response } from "express";
import ShoppingCartService from '../services/shoppingCart';
import { ShoppingCartDto } from "../dto/shoppingCart";

class ShoppingCartController{
  public async getOne(request: Request, response: Response){
    const id: any = request.params.id;
    const retval: ShoppingCartDto = await ShoppingCartService.getOne(id);
    response.status(retval.status).send();
  }

  public async addProduct(request: Request, response: Response){
    const id: any = request.params.id;
  }

  public async removeProduct(request: Request, response: Response){
    const id: any = request.params.id;
    const productItemId: any = request.params.productItemId;
  }

  public async empty(request: Request, response: Response){
    const id: any = request.params.id;
  }
}

export default new ShoppingCartController();