import { Request, Response } from 'express';
import { LogDataController } from '../controllers/controllers';

export class Routes {
    public userDataController: LogDataController = new LogDataController ();

    public routes(app): void {
        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send('Logging API');
        });
        
        app.route('/logs').get (this.userDataController.getLogData)
                          .post (this.userDataController.addNewLogData);
    }
}