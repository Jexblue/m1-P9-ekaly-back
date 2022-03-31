import express from 'express';
import hpp from "hpp";
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import {createConnection} from 'typeorm';
import {dbConnection} from "./db-connection/data-source";
import {useExpressServer} from 'routing-controllers';
import errorMiddleware from "./middlewares/error.middleware";


export class App {

    public app: express.Application;

    public port: string | number;

    public env: string;


    constructor(Controllers: Function[]) {

        this.app = express();
        this.port = process.env.PORT || 3200;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(Controllers);

    }


    public listen() {

        this.app.listen(this.port, () => {

            console.info(`==================================`);
            console.info(`😁 App listening on the port ${this.port}`);
            console.info(`==================================`);

        });

    }


    private connectToDatabase(): void {

        console.info(`Connecting to database`)

        createConnection(dbConnection).then(() => {

            console.info("Database connection established ✅");

        }).catch(error => {

            console.error("----------Database connection failed----------\n", error, "\n----------Database connection failed----------");

        });

    }


    private initializeMiddlewares() {

        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json({limit: 1024 * 1024 * 10, type: 'application/json'}));
        this.app.use(express.urlencoded({extended: false, limit: 1024 * 1024 * 10}));
        this.app.use(cookieParser());
        this.app.use(errorMiddleware);

    }


    private initializeRoutes(controllers: Function[]) {

        useExpressServer(this.app, {
            cors: true,
            controllers: controllers,
            defaultErrorHandler: false,
        });

    }

}
