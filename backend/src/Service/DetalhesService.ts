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


            const resultado = (
                Number(entrada.toFixed(2)) 
                - (fatura01 ? Number(fatura01.toFixed(2)) : fatura01) 
                - (fatura02 ? Number(fatura02.toFixed(2)) : fatura02)
                - (vendas_efetivadas ? Number(vendas_efetivadas.toFixed(2)) : vendas_efetivadas)
                - (vendas_temporaria ? Number(vendas_temporaria.toFixed(2)) : vendas_temporaria)
            ) as number;
            

            return {
                resultado: resultado,

                total_entrada: entrada?  Number(entrada.toFixed(2)) : entrada,
                total_fatura1: fatura01 ? Number(fatura01.toFixed(2)) : fatura01,
                total_fatura2: fatura02 ? Number(fatura02.toFixed(2)) : fatura02,
                total_vendasEfetivadas: vendas_efetivadas ? Number(vendas_efetivadas.toFixed(2)) : vendas_efetivadas,
                total_vendasTemporaria: vendas_temporaria ? Number(vendas_temporaria.toFixed(2)) : vendas_temporaria,
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
                        result[0].SUM ? result[0].SUM : 0
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

                    resolve(
                        result[0].SUM ? result[0].SUM : 0
                    );
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

                    resolve(
                        result[0].SUM ? result[0].SUM : 0
                    );
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

                    resolve(
                        result[0].SUM ? result[0].SUM : 0
                    );
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

                    resolve(
                        result[0].ADD ? result[0].ADD : 0
                    );
                })

            })

        })
    }
}

export {
    DetalhesService
}