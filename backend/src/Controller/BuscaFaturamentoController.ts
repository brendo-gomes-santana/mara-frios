import { Request, Response } from 'express';
import { BuscaFaturamentoService } from '../Service/BuscaFaturamento';
class BuscaFaturamentoControlle{
  async handle(req: Request, res: Response){

    const id = req.params.id as string

    const init = new BuscaFaturamentoService();
    const detalhe = await init.execute(id);

    return res.json(detalhe)

  }
}

export {
  BuscaFaturamentoControlle
}