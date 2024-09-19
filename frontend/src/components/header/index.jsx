import { Link } from 'react-router-dom';
import { ImExit } from "react-icons/im";
import { useContext } from 'react';
import logo from '../../imgs/logo.png'

import { Container } from './styled';
import { AuthContext } from '../../contexts/auth';
export default function Header() {

    const { Deslogar } = useContext(AuthContext);

    return (
        <Container>
            <button onClick={() => Deslogar()}>
                <ImExit size={30} color='#fff' />
            </button>
            <Link to="/painel">
                <img src={logo} alt="logo da empresa" />
            </Link>
        </Container>
    )
}