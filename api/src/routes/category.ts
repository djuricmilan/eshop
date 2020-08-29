import { Router } from "express"
import CategoryController from '../controllers/category';
import authenticate from '../middlewares/authentication';
import authorize from '../middlewares/authorization';
import { Role } from "../models/role";
class ProductRoutes{
  public router: Router;

  constructor(){
    this.router = Router();
    this.config();
  }

  config(){
    this.router.get('/', [authenticate, authorize([Role.USER])], CategoryController.getAll);
    this.router.get('/:id', [authenticate, authorize([Role.USER])], CategoryController.getOne);
    this.router.post('/', [authenticate, authorize([Role.ADMIN])], CategoryController.create);
    this.router.put('/:id', [authenticate, authorize([Role.ADMIN])], CategoryController.update);
    this.router.delete('/:id', [authenticate, authorize([Role.ADMIN])], CategoryController.delete);
  }
}

export default new ProductRoutes().router;