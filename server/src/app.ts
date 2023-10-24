import express from 'express';
import { Application, RequestHandler } from 'express';
import { AppInit } from './interfaces/default/AppInit.interface';
import { IRoute } from './interfaces/default/IRoute.interface';
import { appDataSource } from './config/dataSource';
import notFoundHandler from './middlewares/notFoundHandler';
import errorHandler from '@/middlewares/errorHandler';

class App {
    public app: Application;
    public port: number;
    constructor(appInit: AppInit) {
        this.app = express();
        this.port = appInit.port;
        this.initAssets();
        this.initMiddlewares(appInit.middlewares);
        this.initRoutes(appInit.routers);
        this.initErrorHandler();
    }
    private initMiddlewares(middlewares: RequestHandler[]) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    private initRoutes(routes: IRoute[]) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }
    private initAssets() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    private initErrorHandler() {
        this.app.use(errorHandler);
        this.app.use('*', notFoundHandler);
    }
    public async listen() {
        await appDataSource.initialize();
        this.app.listen(this.port, () => {
            console.log(`App listening  on the http://localhost:${this.port}`);
        });

        process.on('exit', () => {
            appDataSource.destroy();
        });
    }
}

export default App;
