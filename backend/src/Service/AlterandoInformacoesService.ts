import { dbOptions } from "../config/database";
import firebird, { Database } from 'node-firebird';
import Data from "../Utils/Funcoes/data";
import {
    PropsInformacoesTrocar
} from "../Utils/Types/AlterarInformacoestype";

import { EntradaProdutosProps, Balanco2Props } from "../Utils/Types/EntradaDeProdutostype";

class AlterandoInformacoesService {

    async execute({
        id,
        codigo_balanco2,
        codigo_entrada,
        valor_novo_estoque,
        codigogr,
        nome_user,
        referencia,
        descricao
    }: PropsInformacoesTrocar) {

        try {

            await this.cadastrarProdutoEntrada({
                codigo: codigo_entrada,
                codigogr,
                id_produto: id,
                nome_user,
                quantidade: valor_novo_estoque,
                referencia: referencia,
                descricao
            })


            await this.cadastrarProdutoBalanco({
                codigo: codigo_balanco2,
                descricao,
                id_produto: referencia,
                nome_user,
                quantidade: valor_novo_estoque
            })

            await this.atualizarCodigo(codigo_entrada, codigo_balanco2)

            await this.AlterandoEstoque(valor_novo_estoque, id);

            return 'atualizado'

        } catch (err) {
            console.log(err);
            throw new Error('Algo deu errado');
        }

    }

    async cadastrarProdutoBalanco({
        codigo,
        descricao,
        id_produto,
        nome_user,
        quantidade
    }: Balanco2Props): Promise<void> {
        return new Promise((resolve, reject) => {
            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const data = Data()

                const primeiroNome = nome_user.includes(' ') ? nome_user.split(' ')[0] : nome_user;

                const query = `INSERT INTO balanco2 (codigobalanco2, codigo, DATA, descricao, QTD, usuario) 
                                VALUES (?, ?, ?, ?, ?, ?)`;


                const params = [codigo, id_produto, data, descricao, quantidade, primeiroNome];

                db.query(query, params, (err: Error) => {
                    if (err) {
                        return reject('ERRO NO CADASTRO DO BALANCO:' + err);
                    }
                    db.detach();
                    resolve()

                });
            });
        });
    }

    async cadastrarProdutoEntrada({
        codigo,
        codigogr,
        id_produto,
        nome_user,
        quantidade,
        referencia,
        descricao
    }: EntradaProdutosProps): Promise<void> {
        return new Promise((resolve, reject) => {
            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);


                const ano = new Date().getFullYear();
                const mes = (new Date().getMonth() + 1)
                const dia = new Date().getDate()

                const data = String(`${ano}-${mes}-${dia}`);

                const primeiroNome = nome_user.includes(' ') ? nome_user.split(' ')[0] : nome_user;

                const query = `INSERT INTO entradas (codigoent, codigofor, chegada, codmerc, qtde, valortot, codigodepo, descri, valortotal, referencia, precounitario, codigogr, valorfrete, preco, preco2, preco3, selecao, dolar, dolar2, operador, qtdevol, ratefrete, valortotal2, valortotal3, valortotal4, valortotal5, valortotal6, valortotal7, valortotal8, valortotal9, valortotal10, custo2, usuario) 
                        VALUES (?, '99999', ? , ?, ?, 0, '00001', ?, 0, ?, 0, ?, 0, 0, 0, 0, 'F', 0, 0, ?, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ?)`;

                const params = [codigo, data, id_produto, quantidade, descricao, referencia, codigogr, primeiroNome, primeiroNome];

                db.query(query, params, (err: Error) => {
                    if (err) {
                        return reject('Error na entrada' + err);
                    }
                    db.detach();
                    resolve()

                });
            });
        });
    }
    async atualizarCodigo(codigoEnt: number, codigoBalanco: string): Promise<void> {
        return new Promise((resolve, reject) => {
            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const updateQueryENT = `UPDATE CONTROLE_NUMERO 
                                     SET CNT_ULTIMO_NUMERO = ?
                                     WHERE CNT_CAMPO='codigoent'`;

                const updateQueryBALANCO = `UPDATE CONTROLE_NUMERO 
                                            SET CNT_ULTIMO_NUMERO = ?
                                            WHERE CNT_CAMPO='codigobalanco2'`;

                const params = [codigoEnt + 1];
                const paramsBalanco = [Number(codigoBalanco) + 1];

                db.query(updateQueryENT, params, (err: Error) => {
                    if (err) {
                        db.detach();
                        return reject('ERROR no cadastramento do codigo no entrada ' + err);
                    }

                    // Executa a consulta para buscar o valor atualizado
                    db.query(updateQueryBALANCO, paramsBalanco, (err: Error) => {
                        db.detach();
                        if (err) {
                            return reject('ERROR no cadastramento do codigo no balanco ' + err);
                        }

                        resolve()
                    });
                });
            });
        });

    }
    async AlterandoEstoque(valorNovo: number, codigo: string): Promise<void> {
        return new Promise((resolve, reject) => {
            firebird.attach(dbOptions, (err: Error, db: Database) => {
                if (err) return reject(err);

                const selectQuery = `SELECT quantidade 
                                     FROM estoque 
                                     WHERE codmerc = ?`;
                const paramsSelect = [codigo];

                db.query(selectQuery, paramsSelect, (err: Error, result: any[]) => {
                    if (err) {
                        db.detach();
                        return reject(err);
                    }

                    const quantidadeAtual = Number(result[0].QUANTIDADE);
                    const novaQuantidade = quantidadeAtual + valorNovo;

                    const updateQuery = `UPDATE estoque 
                                         SET quantidade = ? 
                                         WHERE codmerc = ?`;
                    const paramsUpdate = [novaQuantidade, codigo];

                    db.query(updateQuery, paramsUpdate, (err: Error) => {
                        db.detach();
                        if (err) {
                            return reject(err);
                        }

                        resolve()

                    });
                });
            });
        });
    }
}

export {
    AlterandoInformacoesService
}