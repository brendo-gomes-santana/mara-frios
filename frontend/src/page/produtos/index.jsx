import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { IoSearch } from "react-icons/io5";

import Container from '../../components/Container';
import Model from "../../components/Model";
import apiBase from "../../api";
import { Form, Table } from "./styled";

export default function Produtos() {

    const {  nome_produto } = useParams();

    const [card, setCard] = useState(null);

    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm()

    function handlePesquisa(data) {
        navigate(`/produtos/${data.produto}`)
    }

    console.log(nome_produto)

    const { data, isLoading, refetch  } = useQuery({
        queryKey: ['produtos'],
        queryFn: async () => {
            const body = {
                nome_produto: nome_produto || ''
              };
          
              try {
                const response = await apiBase.post('/produtos', body); 
                return response.data
              } catch (err) {
                console.error('Erro ao carregar os produtos:', err);
                return null;
              }
        }
    })

    useEffect(() => {
        refetch()
    },[nome_produto, refetch])

    if(isLoading){
        return(
            <div>Carregando...</div>
        )
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit(handlePesquisa)}>
                <label>
                    <strong>Pesquisar produto</strong>
                </label>
                <input
                    placeholder='Nome do produto'
                    {...register('produto', {
                        required: 'Você precisa colocar o nome do produto'
                    })} />
                {errors.produto && (
                    <span>{errors.produto.message}</span>
                )}
                <button type="submit">
                    <IoSearch size={30} color="#000" />
                </button>
            </Form>
            {data?.length !== 0 && (
                <Table border='1'>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome do produto</th>
                            <th>Loc</th>
                            <th>QTDE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                            return (
                                <tr key={item.CODIGO}>
                                    <td>{item.CODIGO}</td>
                                    <td>
                                        <button onClick={() => setCard(item.CODIGO)}>
                                            {item.DESCRICAO5}
                                        </button>
                                    </td>
                                    <td>
                                        {item.LOCALIZACAO}
                                    </td>
                                    <td>
                                        {item.QUANTIDADE.toFixed(3)}
                                        <span>{item.NOMEUNIDA}</span>
                                    </td>
                                    {card === item.CODIGO && (
                                        <Model
                                            atualizarPagina={refetch}
                                            setFechar={setCard}
                                            fechar={card}
                                            bodyData={item} />
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            )}
        </Container>
    )
}

