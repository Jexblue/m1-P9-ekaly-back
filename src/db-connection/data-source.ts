import "reflect-metadata"
import path from "path";
import {ConnectionOptions} from "typeorm";

export const dbConnection: ConnectionOptions = {
    type: 'mongodb',
    url: process.env.MONGO_URI,
    database: 'EKALY',
    ssl: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: ['../**/*.entity{.ts,.js}'],
    migrations: ['../**/*.migration{.ts,.js}'],
    subscribers: ['../**/*.subscriber{.ts,.js}'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
    extra: {connectionLimit: 15}
}
