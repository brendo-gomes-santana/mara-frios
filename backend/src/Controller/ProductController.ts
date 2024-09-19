import { Request, Response } from 'express';
import { ProductsService } from '../Service/ProductsService';

class ProductController{
    async Pesquisar(req: Request, res: Response){
        const nome_produto = req.body.nome_produto as string;

        const inicializado = new ProductsService()
        const resultado = await inicializado.ConsultarProdutos(nome_produto)

        return res.json(resultado);
    }

    async codigo(req: Request, res: Response){

        const codigoString = req.params.codigoString as string;

        const codigo = Number(codigoString);

        const inicializado = new ProductsService()
        const resultado = await inicializado.consultarProdutoCodigo(codigo);

        return res.json(resultado);
    }
}

export { ProductController }