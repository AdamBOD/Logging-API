import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

import {Routes} from './routes/routes'

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://admin:tutUwUS4@ds147213.mlab.com:47213/logging';
    public mongoClient = new MongoClient();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app); 
        this.mongoSetup(); 
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
    }

    private mongoSetup () {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);    
    }
}

export default new App().app;