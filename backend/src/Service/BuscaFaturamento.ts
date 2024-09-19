import firebird, { Database } from 'node-firebird';
import { dbOptions } from '../config/database';
import Data from '../Utils/Funcoes/data';

class BuscaFaturamentoService {
  async execute(id: string) {
    return new Promise((resolve, reject) => {

      firebird.attach(dbOptions, (err: Error, db: Database) => {
        if (err) return reject(err);

        const id_number = Number(id)
        const data = Data();
        const query = 'SELECT QTDE FROM SAIDA_MATERIAL5 WHERE CODIGO= ? AND dataemissao = ?';
        const params = [id_number, data];


        db.query(query, params, (err: Error, result: any[]) => {


          if (err) {
            db.detach();
            return reject(err);
          }

          db.detach()

          resolve(result);
        })

      })

    })
  }
}

export {
  BuscaFaturamentoService
}