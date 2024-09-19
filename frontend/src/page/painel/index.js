import { ImExit } from "react-icons/im";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../../components/Container";
import { AuthContext } from '../../contexts/auth';

import { Button } from "./styled";

export default function Painel() {

    const { Deslogar } = useContext(AuthContext);
    
    const navigate = useNavigate();

    return (
        <Container>
                <Button onClick={() => navigate('/produtos/null')}>Lista de produtos</Button>
                <Button 
                    $brackground="#F84A4D" 
                    onClick={() => Deslogar()}>
                    <ImExit size={15}/> Deslogar
                </Button>
        </Container>
    )
}