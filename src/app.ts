import { config } from 'dotenv';
import * as express from 'express';
import mongoose, { mongo } from 'mongoose';
import * as morgan from 'morgan';
 
export default class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers) {
    config();
    this.connectToDatabase();
    this.app = express();
    this.port = +process.env.PORT;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
  }
 
  private connectToDatabase() {
    const {MONGO_URI, MONGO_DB} = process.env;
    mongoose.connect(MONGO_URI, {dbName: MONGO_DB}, (err) => {
      if (err) {
        console.log('Uh Oh');
        return;
      }
    });
    mongoose.connection.on('error', (err) => {
      console.log(`Mongoose Error: ${err}`);
    });
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
      console.log(`Server reloaded`);
    });
  }
}