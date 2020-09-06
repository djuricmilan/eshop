import { Request, Response } from "express";
import { getRepository } from "typeorm";
import ShoppingCartService from '../services/shoppingCart';
import { ShoppingCartDto } from "../dto/shoppingCart";
import { ProductItemPostDto, ProductItemDto } from "../dto/productItem";
import { ShoppingCart } from "../models/ShoppingCart";
import { ProductItem } from "../models/ProductItem";
import { Product } from "../models/Product";

class ShoppingCartController{
  public async getOne(request: Request, response: Response){
    const id: any = request.params.id;
    const retval: ShoppingCartDto = await ShoppingCartService.getOne(id);
    response.status(retval.status).send(retval);
  }

  public async addProduct(request: Request, response: Response){
    const id: any = request.params.id;
    const productItemPostDto: ProductItemPostDto = request.body;
    const retval: ProductItemDto = await ShoppingCartService.addProduct(id, productItemPostDto);
    response.status(retval.status).send(retval);
  }

  public async removeProduct(request: Request, response: Response){
    const id: any = request.params.id;
    const productItemId: any = request.params.productItemId;
    console.log(productItemId);
    const retval: ShoppingCartDto = await ShoppingCartService.removeProduct(id, productItemId);
    response.status(retval.status).send(retval);
  }

  public async empty(request: Request, response: Response){
    const id: any = request.params.id;
    const retval: ShoppingCartDto = await ShoppingCartService.empty(id);
    response.status(retval.status).send(retval);
  }
}

export default new ShoppingCartController();