import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { MongoClient } from 'mongodb';

import {Routes} from './routes/routes'

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://admin:tutUwUS4@ds357955.mlab.com:57955/logging';
    public mongoClient = new MongoClient();

    constructor() {
        this.app = express();
        this.app.use (cors());
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