import express from 'express'
import cors from "cors"
type AppRoute = { path: string, requestHandler: express.RequestHandler }

export default class App {

    public app: express.Application

    constructor() {
        this.app = express();
        this.app.use(cors())
        this.app.options("*", cors())
    }


    public initializeApp = (middlewares: express.RequestHandler[], routes: AppRoute[]) => {
        this._addMiddleware(middlewares)
        this._initializeRoutes(routes)
    }
 

    private _addMiddleware = (middlewares: express.RequestHandler[]) => {
        middlewares.forEach(it => this.app.use(it))
    }


    private _initializeRoutes = (routes: AppRoute[]) => {
        //this.app.use(express.static(__dirname + '/reactBuild'));
        routes.forEach(it => this.app.use(it.path, it.requestHandler))
    }


    public listen = (port: number) => {
        this.app.listen(port)
    }
}