import { Router } from "express";
import AuthenticationController from "../controllers/auth";
import authenticate from '../middlewares/authentication';

class AuthenticationRoutes{
  public router: Router;

  constructor(){
    this.router = Router();
    this.config();
  }

  config(){
    this.router.post('/register', AuthenticationController.register);
    this.router.post('/login', AuthenticationController.login);
    this.router.post('/changePassword', [authenticate], AuthenticationController.changePassword);
    this.router.get('/usernames', AuthenticationController.usernames);
  }
}

export default new AuthenticationRoutes().router;