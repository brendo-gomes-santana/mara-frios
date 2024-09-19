import { Request, Response } from 'express';
import { AlterandoInformacoesService } from '../Service/AlterandoInformacoesService';

class AlterarDoInformacoesController{

    async alterar(req: Request, res:Response){

        const {
            codigo_balanco2,
            codigo_entrada,
            codigogr,
            descricao,
            nome_user,
            referencia,
            valor_novo_estoque
        } = req.body;

        const id = req.params.id as string;

        const inicializado = new AlterandoInformacoesService();
        const resultado = await inicializado.execute({
            codigo_balanco2,
            codigo_entrada,
            codigogr,
            descricao,
            id,
            nome_user,
            referencia,
            valor_novo_estoque
        })

        return res.json(resultado);

    }
 
}

export {
    AlterarDoInformacoesController
}