import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Logado({children}){

    const { logado, loading } = useContext(AuthContext);

    if(loading){
        return(
            <section>
                <h1>Carregando...</h1>
            </section>
        )
    }


    if(!logado){
        return <Navigate to="/"/>
    }

    return children
}