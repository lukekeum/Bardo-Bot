import express, { Application } from 'express';
import logger from './config/winston';
import router from './routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.registerRouter();
  }

  public listen(callbackFN: Function = emptyFN) {
    const { PORT = String(3000) } = process.env;
    try {
      this.app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
      });
    } catch (err) {
      /* Handle error from this.app.listen */
      logger.error(err);
      return;
    }
    callbackFN();
  }

  private registerRouter() {
    // Regist routers
    this.app.use(router);
  }
}

const emptyFN = () => {
  return;
};

const app = new App();

export default app;
