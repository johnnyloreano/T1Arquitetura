import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import errprHandler from './errors/handler';
export default class Server{

    private static instance : Server;
    private static express: any;
    private constructor(){
        Server.express = express();
    }
    public start(){
        Server.express.use(cors());
        Server.express.use(express.json());
        Server.express.use(routes);
        Server.express.use(errprHandler);
        Server.express.listen(3333);
    }
    public static getInstance(){
        if(!Server.instance)
            Server.instance = new Server();
        return Server.instance;
    }
}