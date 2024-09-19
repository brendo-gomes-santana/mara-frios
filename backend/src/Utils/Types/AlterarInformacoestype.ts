export interface PropsInformacoesTrocar {
    id: string,
    codigo_entrada: number,
    codigo_balanco2: string,
    valor_novo_estoque: number,
    nome_user: string,

    referencia: string,
    codigogr: string,

    descricao: string
    
}



export interface DBRetornoVerificacaoCodigo {
    liberado: boolean,
    diferenca: number
}