import { PropsUser } from '../Utils/Types/User';
import { dbOptions } from '../config/database';
import firebird, { Database } from 'node-firebird';
import { RetornoLogin } from '../Utils/Types/User';

class UserService {
    async logar({ name, password }: PropsUser): Promise<RetornoLogin[] | Error>{
        return new Promise((resolve, reject) => {
            if (name === '' || password === '') {
                return reject(new Error('Preenchar os campos'));
            }

            firebird.attach(dbOptions, function (err: Error, db: Database) {
                if (err) return reject(err);
               
                const query = `SELECT LOGIN_USER, LOGIN_NOME, E_MAIL FROM USUARIO WHERE LOGIN_USER = ? AND LOGIN_SENHA = ?`;
                const params = [name.toUpperCase().trim(), password.toUpperCase().trim()];

                db.query(query, params, function (err: Error, result: RetornoLogin[]) {
                    if (err) {
                        db.detach();
                        return reject(err);
                    }
                    
                    // Important: close the connection
                    db.detach();
                    
                    if(result.length === 0){
                        return reject(new Error("Informações incorrenta ou usuário não existe"));
                    }else{
                        resolve(result);
                    }
                });
            });
        });
    }
}

export { UserService };
