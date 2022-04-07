import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectWithMongoose } from "./utils/database/database.utils";
import { createExpressServer, useExpressServer } from "routing-controllers";
import { DefaultController } from "./controllers/default.controller";
import { UserController } from "./controllers/user.controller";
import { SakafoController } from "./controllers/sakafo.controller";


class Server {

    private app: express.Application;

    private readonly port: string | number;

    private readonly databaseUri: string;


    constructor(controllers: Function[]) {

        // Setting express app
        this.app = express();

        // Setting server port form the env vars or if null use 3200
        this.port = process.env.PORT || 3200;

        // Setting the database connection url
        this.databaseUri = process.env.DATABASE_URI || 'mongodb://localhost:27107/ekaly_db';

        // Setting the middlewares
        this.setMiddlewares();

        // Setting the routes
        this.setRoutes(controllers);

    }


    public setRoutes(controllers: Function[]): void {

        useExpressServer(this.app, {
            cors: true,
            controllers: controllers, // we specify controllers we want to use
            defaultErrorHandler: false
        });

    }


    public async run(): Promise<void> {

        this.app.listen(this.port, async () => {

            if (!(await connectWithMongoose(this.databaseUri))) {

                process.exit(1);

            }

        });

    }


    private setMiddlewares(): void {

        // Use morgan for http log
        this.app.use(morgan('dev'));
        this.app.use(express.json({ limit: 1024 * 1024 * 10, type: 'application/json' }));
        this.app.use(express.urlencoded({ extended: false, limit: 1024 * 1024 * 10 }));
        this.app.use(cors({ origin: '*' }));

    }

}


const server: Server = new Server([
    DefaultController,
    UserController,
    SakafoController,
]);

server.run().then(() => {

    console.log(`
██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗
╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝

███████╗    ██╗  ██╗ █████╗ ██╗  ██╗   ██╗    ██████╗ ██╗   ██╗███╗   ██╗███╗   ██╗██╗███╗   ██╗ ██████╗ ██╗      
██╔════╝    ██║ ██╔╝██╔══██╗██║  ╚██╗ ██╔╝    ██╔══██╗██║   ██║████╗  ██║████╗  ██║██║████╗  ██║██╔════╝ ██║      
█████╗█████╗█████╔╝ ███████║██║   ╚████╔╝     ██████╔╝██║   ██║██╔██╗ ██║██╔██╗ ██║██║██╔██╗ ██║██║  ███╗██║      
██╔══╝╚════╝██╔═██╗ ██╔══██║██║    ╚██╔╝      ██╔══██╗██║   ██║██║╚██╗██║██║╚██╗██║██║██║╚██╗██║██║   ██║╚═╝      
███████╗    ██║  ██╗██║  ██║███████╗██║       ██║  ██║╚██████╔╝██║ ╚████║██║ ╚████║██║██║ ╚████║╚██████╔╝██╗      
╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝       ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝      

██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗██╗
╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝╚═╝
    `);

});