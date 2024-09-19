import { Router } from "express";

import { UserController } from "./Controller/UserController";
import { ProductController } from "./Controller/ProductController";
import { DetalheController } from "./Controller/DetalhesController";
import { GerarCodigoController } from "./Controller/GerarCodigoController";
import { AlterarDoInformacoesController } from "./Controller/AlterarDoInformacoesController";
import { BuscaFaturamentoControlle } from "./Controller/BuscaFaturamentoController";
const route = Router();

route.post('/logar', new UserController().Logar);

//PRODUTOS
route.post('/produtos', new ProductController().Pesquisar);
route.get('/produtos/:id', new DetalheController().show);
route.get('/produto/:codigoString', new ProductController().codigo);
route.put('/produtos/:id', new AlterarDoInformacoesController().alterar);

//CODIGO
route.get('/codigo', new GerarCodigoController().show);

//Detalhe
route.get('/fatura/:id', new BuscaFaturamentoControlle().handle)
export { route }