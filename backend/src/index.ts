import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { route } from './route';
import http from 'http';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1', route);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).send({
            error: err.message
        })
    }
    return res.status(500).send({
        status: 'error',
        message: 'Internal server error'
    })
})

const server = http.createServer(app);

server.listen(3333, ()=> {
    console.log('SERVIDOR NO AR')
});


