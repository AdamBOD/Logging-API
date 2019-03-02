import * as mongoose from 'mongoose';
import { LogSchema } from '../models/models';
import { Request, Response } from 'express';

const LogData = mongoose.model('LogData', LogSchema);

export class LogDataController{
    public getLogData (req: Request, res: Response) {
        if (req.query.userID != null) {
            LogData.find ((err, logData) => {
                if(err){
                    console.log ('Eror getting user data');
                    res.send(err);
                }
                res.json(logData);
            });
        } else {
            // res.send ('Empty Request');
            console.log ('Empty Request');
            LogData.find({}, (err, logData) => {
                if(err){
                    console.log ('Eror getting user data');
                    res.send(err);
                }
                res.json(logData);
            }).sort ({time: -1});
        }
    }

    // Needs to be x-www-form-urlencoded
    public addNewLogData (req: Request, res: Response) { 
        let newLogData = new LogData (req.body);
    
        newLogData.save((err, userData) => {
            if(err){
                res.send(err);
            }    
            res.json(userData);
        });
    }
}