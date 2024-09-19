import { dbOptions } from "../config/database";
import { RetornoProdutoLista } from "../Utils/Types/Products";
import firebird, { Database } from 'node-firebird';

class ProductsService {

    async ConsultarProdutos(nome_produto?: string): Promise<RetornoProdutoLista[] | Error> {

        if(nome_produto === ''){
            throw new Error('Digite o nome do produto');
        }

        return new Promise((resolve, reject) => {
            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const query = `SELECT A.CODIGO, A.DESCRICAO5, B.QUANTIDADE, C.NOMEUNIDA, A.LOCALIZACAO
                                FROM PRODUTOS A, ESTOQUE B, UNIDADES C
                                WHERE A.DESCRICAO5 IS NOT NULL 
                                AND A.CODIGO = B.CODMERC
                                AND  C.CODIGOUN = A.CODIGOUN 
                                AND A.DESCRICAO5 LIKE ?`;
                                
                const params = [`%${nome_produto?.toUpperCase()}%`];

                db.query(query, params, (err: Error, result: RetornoProdutoLista[]) => {
                    if (err) {
                        db.detach();
                        return reject(err);
                    }

                    // Important: close the connection
                    db.detach();

                    // Cast result to RetornoProdutoLista[]
                    resolve(result);
                });
            });
        });
    }
    async consultarProdutoCodigo(codigo: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const query = `SELECT A.codigo, A.codigogr, A.descricao5, A.referencia, B.quantidade, C.NOMEUNIDA, A.DEPOSITO
                                FROM produtos A, ESTOQUE B, UNIDADES C
                                WHERE A.codigo= ? 
                                AND B.CODMERC = ?
                                AND C.CODIGOUN = A.CODIGOUN 
                                `;
                                
                const params = [codigo, codigo];

                db.query(query, params, (err: Error, result: any[]) => {
                    if (err) {
                        db.detach();
                        return reject(err);
                    }

                    // Important: close the connection
                    db.detach();
                  
                    // Cast result to RetornoProdutoLista[]
                    resolve(result[0]);
                });
            });
        });
    }
    
}


export {
    ProductsService
}
