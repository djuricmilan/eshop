import { Router } from "express";
import ShoppingCartController from '../controllers/shoppingCart';
import authenticate from '../middlewares/authentication';
import authorize from '../middlewares/authorization';
import {Role} from '../models/role';

class ShoppingCartRoutes{
  router: Router;

  constructor(){
    this.router = Router();
    this.config();
  }

  public config(){
    this.router.get('/:id', [authenticate, authorize([Role.USER])], ShoppingCartController.getOne);
    this.router.put('/:id/add', [authenticate, authorize([Role.USER])], ShoppingCartController.addProduct);
    this.router.put('/:id/remove/:productItemId', [authenticate, authorize([Role.USER])], ShoppingCartController.removeProduct);
    this.router.put('/:id/empty', [authenticate, authorize([Role.USER])], ShoppingCartController.empty);
  }
}

export default new ShoppingCartRoutes().router;