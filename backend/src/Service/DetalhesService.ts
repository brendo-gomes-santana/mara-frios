import firebird, { Database } from 'node-firebird';
import { dbOptions } from '../config/database';

import {
    ReturnoPrincipal,

    RetornoSomar,
    RETORNOADD
} from '../Utils/Types/Detalhestype';

class DetalhesService {

    async execute(id: string): Promise<ReturnoPrincipal | Error> {
        try {
            const [entrada, vendas_temporaria, vendas_efetivadas, fatura01, fatura02] = await Promise.all([
                this.ConsultarEntrada(id),
                this.ConsultarVendas_temporarias(id),
                this.ConsultarVendas_efetivadas(id),
                this.ConsultarFatura01(id),
                this.ConsultarFatura02(id)
            ])


            const resultado = entrada - vendas_efetivadas - vendas_temporaria - fatura01 - fatura02 as number

            return {
                resultado: resultado,

                total_entrada: entrada,
                total_fatura1: fatura01,
                total_fatura2: fatura02,
                total_vendasEfetivadas: vendas_efetivadas,
                total_vendasTemporaria: vendas_temporaria,
            }

        } catch (err) {
            console.log(err);
            throw new Error('algo deu errado')
        }
    }

    async ConsultarEntrada(id: string): Promise<number> {
        return new Promise((resolve, reject) => {

            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const query = 'SELECT  SUM(QTDE) FROM ENTRADAS WHERE CODMERC = ?';
                const params = [id];


                db.query(query, params, (err: Error, result: RetornoSomar[]) => {


                    if (err) {
                        db.detach();
                        return reject(err);
                    }

                    db.detach()

                    resolve(
                         result[0].SUM
                    );
                })

            })

        })
    }

    async ConsultarVendas_temporarias(id: string):Promise<number> {
        return new Promise((resolve, reject) => {

            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const query = 'SELECT SUM(QUANTIDADE) FROM VENDASBALCAO WHERE T01 = ?';
                const params = [id];


                db.query(query, params, (err: Error, result: RetornoSomar[]) => {


                    if (err) {
                        db.detach();
                        return reject(err);
                    }

                    db.detach()

                    resolve(result[0].SUM);
                })

            })

        })
    }

    async ConsultarVendas_efetivadas(id: string): Promise<number> {
        return new Promise((resolve, reject) => {

            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const query = 'SELECT SUM(QUANTIDADE) FROM VENDASBALCAO7 WHERE T01 = ?';
                const params = [id];


                db.query(query, params, (err: Error, result: RetornoSomar[]) => {


                    if (err) {
                        db.detach();
                        return reject(err);
                    }

                    db.detach()

                    resolve(result[0].SUM);
                })

            })

        })
    }

    async ConsultarFatura01(id: string): Promise<number> {
        return new Promise((resolve, reject) => {

            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const query = 'SELECT SUM(QTDE) FROM SAIDA_MATERIAL3 WHERE CODIGO = ?';
                const params = [id];


                db.query(query, params, (err: Error, result: RetornoSomar[]) => {


                    if (err) {
                        db.detach();
                        return reject(err);
                    }

                    db.detach()

                    resolve(result[0].SUM);
                })

            })

        })
    }

    async ConsultarFatura02(id: string): Promise<number> {
        return new Promise((resolve, reject) => {

            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const query = `SELECT sum(qtde) + sum(quantboni) 
                                FROM saida_material5 
                                WHERE codigo = ? 
                                AND deposito='00001' 
                                AND qtde is not null 
                                AND importacao is null 
                                AND obs3 is null`;
                const params = [id];


                db.query(query, params, (err: Error, result: RETORNOADD[]) => {


                    if (err) {
                        db.detach();
                        return reject(err);
                    }

                    db.detach()

                    resolve(result[0].ADD);
                })

            })

        })
    }
}

export {
    DetalhesService
}