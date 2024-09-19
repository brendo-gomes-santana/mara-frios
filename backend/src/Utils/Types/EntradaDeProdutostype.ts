export interface EntradaProdutosProps {
    codigo: number,
    id_produto: string,
    quantidade: number,
    referencia: string,
    codigogr: string,
    nome_user: string

    descricao: string
}

export interface Balanco2Props {
    codigo: string,
    id_produto: string,
    descricao: string,
    
    quantidade: number,
    nome_user: string
}