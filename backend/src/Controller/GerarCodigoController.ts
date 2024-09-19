import { Request, Response } from 'express';
import { GerarCodigoService } from '../Service/GerarCodigoService';



class GerarCodigoController{
    async show(req: Request, res: Response){

        const inicializado = new GerarCodigoService();
        const retorno = await inicializado.execute();

        return res.json(retorno);

    }
}

export{
    GerarCodigoController
}