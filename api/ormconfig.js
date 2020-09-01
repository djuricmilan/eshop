require("dotenv").config();

let options = {};
if(process.env.MYSQL_DATABASE_URL){
  //production
  options = {
    type: 'mysql',
    url: process.env.MYSQL_DATABASE_URL,
    logging: true,
    synchronize: true,
	  entities: ["./src/models/*.ts"]
  };
}else{
  //local development(with docker or no docker)
  options = {
    type: 'mysql',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
    username: process.env.TYPEORM_USERNAME || 'developer',
    password: process.env.TYPEORM_PASSWORD || 'developer',
    database: process.env.TYPEORM_DATABASE || 'shop',
    logging: true,
    synchronize: true,
    entities: ["./src/models/*.ts"]
  };
}
module.exports = options;