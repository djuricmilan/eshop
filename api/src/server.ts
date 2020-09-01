import {App} from './app';
import {PORT} from './config/config';
import {createConnection, ConnectionOptions} from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

let options: ConnectionOptions;
if(process.env.MYSQL_DATABASE_URL){
  //production
  options = {
    type: 'mysql',
    url: process.env.MYSQL_DATABASE_URL,
    logging: true,
    synchronize: true,
	  entities: ["./models/*.js"]
  };
}else{
  //local development(with docker or no docker)
  options = {
    type: 'mysql',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: process.env.TYPEORM_PORT ? parseInt(process.env.TYPEORM_PORT, 10) : 3306,
    username: process.env.TYPEORM_USERNAME || 'developer',
    password: process.env.TYPEORM_PASSWORD || 'developer',
    database: process.env.TYPEORM_DATABASE || 'shop',
    logging: true,
    synchronize: true,
    entities: ["./src/models/*.ts"]
  };
}
console.log(options);
createConnection(options).then(() => {
  const app = new App().app;
  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  })
});

