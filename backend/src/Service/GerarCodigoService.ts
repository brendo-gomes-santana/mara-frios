import { dbOptions } from '../config/database';
import firebird,{ Database } from 'node-firebird';

import { DBCodigoGeradoType, RetornoServiceGerado } from '../Utils/Types/CodigoType';

class GerarCodigoService {
    async execute():Promise<any>{
        return new Promise((resolve, reject) => {
            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const query = "select * from controle_numero where cnt_campo= ? or cnt_campo=?";
                const params = ['codigobalanco2', 'codigoent'];

                db.query(query, params, (err: Error, result: any[]) => {
                    if (err) {
                        db.detach();
                        return reject(err);
                    }
                    db.detach();
                    const codigobalancoString = result[1].CNT_ULTIMO_NUMERO 
                    const codigoEnt = result[0].CNT_ULTIMO_NUMERO 
                    const codigoBalanco = codigobalancoString.toLocaleString('en-US', { minimumIntegerDigits: 10, useGrouping: false })
                    
                    resolve({
                        codigoEnt,
                        codigoBalanco
                    });
                });
            });
        });

    }
}

export {
    GerarCodigoService
}
