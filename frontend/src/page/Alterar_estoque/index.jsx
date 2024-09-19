import { useContext, useState } from "react";
import { format } from "date-fns";
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { IoChevronBackCircle } from "react-icons/io5";
import Container from '../../components/Container';

import { ContainerVolta, Form } from './styled';
import apiBase from "../../api";
import { AuthContext } from "../../contexts/auth";

export default function AlterarEstoque() {
    const data = useLoaderData();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, setValue, getValues } = useForm();

    const navigate = useNavigate();

    // Função para formatar o valor
    const formatValue = (value) => {
        if (value === '') return '';
        const numericValue = parseFloat(value.replace(',', '.')) || 0;
        return (numericValue * 1000).toLocaleString('pt-BR', { minimumFractionDigits: 0 });
    };

    // Função chamada quando o valor do input perde o foco
    const handleBlur = () => {
        const value = getValues('valor_novo_estoque');
        const formattedValue = formatValue(value);
        setValue('valor_novo_estoque', formattedValue);
    };

    async function handleAlterar(dataForm) {

        const descricaoQ = data.descricao.DESCRICAO5.split(' ')

        setLoading(true);

        try {
            console.log('entrou aqui no try')
            const body = {
                codigo_entrada: data.codigoEnt,
                codigo_balanco2: data.codigoBalanco,

                valor_novo_estoque: Number(dataForm.valor_novo_estoque),

                codigogr: data.descricao.CODIGOGR,
                nome_user: user.LOGIN_USER,
                referencia: data.descricao.REFERENCIA,

                descricao: data.descricao.DESCRICAO5
            };

            await apiBase.put(`/produtos/${data.id_produto}`, body);
            navigate(`/produtos/${descricaoQ[0]} ${descricaoQ[1]} ${descricaoQ[2]}`);
            console.log('chegou aqui')
        } catch (err) {
            console.error(err);
            toast.error('Algo deu errado');
        } finally {
            setLoading(false);
        }

    }

    return (
        <Container>
            <ContainerVolta>
                <button onClick={() => navigate(-1)}>
                    <IoChevronBackCircle size={30}/> Volta
                </button>
            </ContainerVolta>
            <Form onSubmit={handleSubmit(handleAlterar)}>
                <h1>Alteração no Estoque</h1>
                <label>
                    <strong>Código: </strong> {data.codigoEnt}
                </label>
                <label>
                    <strong>Código produto: </strong> {data.descricao.REFERENCIA}
                </label>

                <label style={{ textAlign: 'center' }}>
                    <strong>Descrição do produto</strong>
                    <p>{data.descricao.DESCRICAO5}</p>
                </label>

                <label>
                    <strong>Unidade: </strong> {data.descricao.NOMEUNIDA}
                </label>

                <label>
                    <strong>Estoque atual: </strong> {data.descricao.QUANTIDADE}
                </label>

                <label>
                    <strong>Data: </strong> {format(new Date(), "dd/MM/yyyy")}
                </label>

                <label>
                    <strong>Quantidade: </strong>
                    <Controller
                        name="valor_novo_estoque"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                type='text'
                                {...field}
                                onBlur={handleBlur} // Formata o valor ao sair do campo
                                disabled={loading}
                            />
                        )}
                    />
                </label>
                <button
                    style={loading ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Salvar alterações'}
                </button>
            </Form>
        </Container>
    );
}
