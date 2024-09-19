import { Request, Response } from 'express';
import { DetalhesService } from '../Service/DetalhesService';

class DetalheController{
    async show(req: Request, res: Response){

        const id = req.params.id as string;

        const inicializado = new DetalhesService();
        const retorno = await inicializado.execute(id)


        return res.json(retorno);

    }
}


export {
    DetalheController
}