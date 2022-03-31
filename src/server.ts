import 'dotenv/config';
import 'reflect-metadata';
import {App} from "./app";
import {IndexController} from "./controllers/index.controller";
import {UserController} from "./controllers/user.controller";


const app = new App([
    IndexController,
    UserController
]);

app.listen();



