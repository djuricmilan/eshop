import { RegisterDto, LoginDto, ChangePasswordDto } from "../dto/auth";
import { CustomResponse } from "../dto";
import {CustomLoginResponse} from "../dto/auth";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { Role } from "../models/role";
import { validate } from "class-validator";
import jsonwebtoken from 'jsonwebtoken';
import { SECRET } from "../config/config";

class AuthenticationService{
  public async register(body: RegisterDto): Promise<CustomResponse>{
    const userRepository = getRepository(User);
    body.role = Role.USER;
    let temp: User = new User();
    temp.initializeFromDto(body);

    const errors = await validate(temp);
    if(errors.length == 0){
      let user: User = await userRepository.save(temp);
      return{
        status: 200,
        success: true,
      };
    }else{
      return{
        status: 403,
        success: false,
        message: errors[0].toString()
      };
    }
  }

  public async login(body: LoginDto): Promise<CustomLoginResponse>{
    const {username, password} = body;
    const userRepostiory = getRepository(User);
    try{
      let user: User = await userRepostiory.findOneOrFail({where: {username}});
      if(user.checkUnencryptedPassword(password)){
        const token = <any>jsonwebtoken.sign({id: user.id, username: user.username}, SECRET, {expiresIn: '1h'});
        return {
          token,
          role: user.role,
          success: true,
          status: 200
        }
      }else{
        return {
          success: false,
          status: 401
        }
      }
    }catch(error){
      return {
        success: false,
        status: 404
      }
    }
  }

  public async changePassowrd(body: ChangePasswordDto): Promise<CustomResponse>{
    const {username, oldPassword, newPassword} = body;
    const userRepository = getRepository(User);
    let user: User;
    try{
      user = await userRepository.findOneOrFail({where: {username}});
      if(!user.checkUnencryptedPassword(oldPassword))
        return {
          status: 401,
          success: false,
          message: 'Wrong password'
        };
      
      user.password = newPassword;
      const errors = await validate(user);
      if(errors.length > 0)
        return {
          status: 403,
          success: false
        };
      
      user.encryptPassword();
      userRepository.save(user);
      return {
        status: 200,
        success: true
      };
    }catch(error){
      return {
        status: 404,
        success: false
      };
    }
  }

  async usernames(){
    const userRepository = getRepository(User);
    return (await userRepository.find()).map(x => x.username);
  }
}

export default new AuthenticationService();