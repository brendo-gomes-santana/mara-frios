import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FaClipboardUser } from "react-icons/fa6";

import { AuthContext } from '../../contexts/auth';

import logo from '../../imgs/logo.png';
import {
    Container,
    Header,
    Form
} from './styled';

export default function Home() {

    const { Logar, user } = useContext(AuthContext)

    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [mostrar, setMostrar] = useState(false)

    function handleLogar(data) {
        Logar(data);
    }


    useEffect(() => {
        if(errors.password){
            toast.error(errors.password.message);
        }
        if(errors.name){
            toast.error(errors.name.message);
        }
    },[errors.password, errors.name]);

    useEffect(() => {
        (()=>{
            if(user){
                navigate('/painel')
            }
        })()

    },[user, navigate])

    return (
        <Container>
            <Header>
                <img src={logo} alt='logo da empresa' />
            </Header>
            <Form onSubmit={handleSubmit(handleLogar)}>
                <label>
                    <FaClipboardUser size={30} />
                    Login
                </label>
                <input
                    placeholder='Nome'
                    {...register("name", { required: "É necessário colocar o nome" })}
                />
                <input
                    type={mostrar ? "text" : "password"}
                    placeholder='Senha'
                    
                    {...register("password", { required: "É necessário colocar senha" })}
                />

                <span
                    onClick={() => setMostrar(!mostrar)}
                >
                    {
                        mostrar ? (
                            "Ocultar senha"
                        ) : (
                            "Mostrar senha"
                        )
                    }
                </span>
                <button type='submit'>Login</button>
            </Form>
        </Container>
    )
}