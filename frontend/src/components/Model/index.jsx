import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import { useQuery } from '@tanstack/react-query'
import {
    Container,
    Modelo,
} from "./styled"
import apiBase from "../../api";

export default function Model({ bodyData, setFechar, fechar, atualizarPagina }) {

    const navigate = useNavigate();
    const [dataFaturamento, setDataFaturamento] = useState([])
    const [abrir, setAbrir] = useState(false);
    const [loading, setLoading] = useState(false);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['informacoes'],
        queryFn: async () => {
            try {
                const response = await apiBase.get(`/produtos/${bodyData.CODIGO}`)
                return response.data
            } catch (err) {
                console.log(err);
                return err
            }
        }
    })

    useEffect(() => {

        if (fechar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [fechar]);

    function dadosRetorno(infor) {
        if (isLoading) {
            return 'Carregando...'
        }

        if (infor === null) {
            return 'Sem informação'
        }

        return infor.toFixed(3)
    }

    async function handleFaturamentoDodia() {
        if (abrir) {
            setAbrir(false)
            return
        }

        try {
            setLoading(true)
            const data = await apiBase.get(`/fatura/${bodyData.CODIGO}`)
            setDataFaturamento(data.data)
            console.log(data.data)
            setAbrir(true)

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container>
            <div>
                <h1>{bodyData?.DESCRICAO5}</h1>
                <p>
                    <strong>Quantidade atual:</strong> {bodyData?.QUANTIDADE.toFixed(3)}
                </p>
                <p>
                    <strong>Localização: </strong>{bodyData?.LOCALIZACAO === null ? "Não possui cadastro" : bodyData?.LOCALIZACAO}
                </p>
            </div>
            <Modelo>
                <h3>Entrada</h3>
                <p>{dadosRetorno(data?.total_entrada)}</p>

                <h3>Vendas balcão temporaria</h3>
                <p>{dadosRetorno(data?.total_vendasTemporaria)}</p>

                <h3>Vendas balcão efetivadas</h3>
                <p>{dadosRetorno(data?.total_vendasEfetivadas)}</p>

                <h3>Vendas faturamento temporaria</h3>
                <p>{dadosRetorno(data?.total_fatura1)}</p>


                <h3>Vendas faturamento finalizadas</h3>
                <span
                    style={{ fontSize: 13, cursor: 'pointer' }}
                    onClick={() => { handleFaturamentoDodia() }}>
                    {loading ? 'carregando...' : `Faturamento do dia ${abrir ? '- FECHA': ''}`}
                </span>
                {
                    abrir && (
                        <div style={{ borderBottom: '1px solid #000', width: 150, margin: '0 auto' }}>
                            {dataFaturamento?.map((item) => {
                                return (
                                    <p key={item.QTDE}>{item.QTDE}</p>
                                )
                            })}
                            {dataFaturamento.length === 0 && (
                                <p style={{ fontSize: 13 }}>Nada foi faturado hoje</p>
                            )}
                        </div>
                    )
                }
                <p>{dadosRetorno(data?.total_fatura2)}</p>

                <h3>Quantidade atual</h3>
                <p>{dadosRetorno(data?.resultado)}</p>
            </Modelo>

            <button
                style={{ backgroundColor: '#FF6264' }}
                onClick={() => setFechar(null)}>
                Fechar
            </button>

            <button
                onClick={() => navigate(`/produto/alterar/${bodyData?.CODIGO}`)}>
                Alterar estoque
            </button>

            <button
                onClick={() => {
                    refetch()
                    atualizarPagina()
                    }
                }>
                Carregar Informações
            </button>

        </Container>
    )
}