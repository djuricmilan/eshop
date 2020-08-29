import { Request, Response, NextFunction } from "express";
import jsonwebtoken from 'jsonwebtoken';
import { SECRET } from "../config/config";

export default (request: Request, response: Response, next: NextFunction) => {
  const authorizationHeader = <string>request.headers['authorization'];
  if(!authorizationHeader)
    response.status(401).send();
    
  const token = authorizationHeader.split(' ')[1];
  let payload;
  try{
    payload =  <any>jsonwebtoken.verify(token, SECRET);
    response.locals.payload = payload;
  }catch(error){
    response.status(401).send();
  }
  const {id, username} = payload;
  const newToken = jsonwebtoken.sign({id, username}, SECRET, {expiresIn: '1h'});
  response.setHeader('token', newToken);
  next();
}