import { Router } from "express"
import ProductController from '../controllers/product';
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
    this.router.get('/', [authenticate, authorize([Role.USER])], ProductController.getAll);
    this.router.get('/:id', [authenticate, authorize([Role.USER])], ProductController.getOne);
    this.router.get('/stats/maxPrice', [authenticate, authorize([Role.USER])], ProductController.getMaxPrice);
    this.router.post('/', [authenticate, authorize([Role.ADMIN])], ProductController.create);
    this.router.put('/:id', [authenticate, authorize([Role.ADMIN])], ProductController.update);
    this.router.delete('/:id', [authenticate, authorize([Role.ADMIN])], ProductController.delete);
  }
}

export default new ProductRoutes().router;