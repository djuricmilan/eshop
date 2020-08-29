import { Request, Response } from "express";
import { RegisterDto, LoginDto, ChangePasswordDto } from "../dto/auth";
import { CustomResponse } from "../dto";
import AuthenticationService from "../services/auth";

class AuthenticationController{
  public async register(request: Request, response: Response){
    const body: RegisterDto = request.body;
    let retval: CustomResponse = await AuthenticationService.register(body);
    response.status(retval.status).send({message: retval.message});
  }

  public async login(request: Request, response: Response){
    const body: LoginDto = request.body;
    let retval = await AuthenticationService.login(body);
    response.status(retval.status);
    response.send(retval);
  }

  public async changePassword(request: Request, response: Response){
    const body: ChangePasswordDto = request.body;
    const retval = await AuthenticationService.changePassowrd(body);
    response.status(retval.status).send();
  }

  public async usernames(request: Request, response: Response){
    const retval = await AuthenticationService.usernames();
    response.send(retval);
  }
}

export default new AuthenticationController();