import { Role } from "../models/role";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

export default (roles: Array<Role>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const payload = response.locals.payload;
    const userRepository = getRepository(User);
    let user: User;
    try{
      user = await userRepository.findOneOrFail(payload.id);
      if(roles.indexOf(user.role) != -1){
        next();
      }else
        response.status(401).send();
    }catch(error){
      response.status(401).send();
    }
  };
};