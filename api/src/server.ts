import {App} from './app';
import {PORT} from './config/config';
import {createConnection} from 'typeorm';
import 'reflect-metadata';

createConnection().then(() => {
  const app = new App().app;
  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  })
})