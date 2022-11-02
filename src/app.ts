import * as express from 'express';
import * as morgan from 'morgan';
 
export default class App {
  public app: express.Application;
  public port: number;
 
  constructor(controllers, port: number) {
    this.app = express();
    this.port = port;
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }
 
  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
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