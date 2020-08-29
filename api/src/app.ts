import express, {Application} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/index';

export class App{
  public app: Application;
  
  constructor(){
    this.app = express();
    this.config();
  }

  config(){
    //set third party middleware
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    //configure routes
    this.app.use('/api', router);
    
  }
}