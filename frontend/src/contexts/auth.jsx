import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import apiBase from '../api'

export const AuthContext = createContext({});


export default function ProviderAuth({children}){

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (() => {
            const stringUser = localStorage.getItem("@user");

            if(stringUser){
                const user = JSON.parse(stringUser);
                setUser(user);

            }else{
                setUser(null);
              
            }

            setLoading(false);
        })()

    },[])


    async function Logar(data){
        try{

            const response = await apiBase.post('/logar', data);
            localStorage.setItem("@user", JSON.stringify(response.data[0]));
            setUser(response.data[0]);
            navigate('/painel');

        }catch(err){
            console.error(err);
            toast.error(err.response.data.error)
        }
    }

    function Deslogar(){
        setUser(null)
        localStorage.removeItem("@user");
        navigate('/');
    }

    return(
        <AuthContext.Provider
            value={{
                user,
                logado: !!user,
                loading,

                Logar,
                Deslogar
                
            }}>
            {children}
        </AuthContext.Provider>
    )
}

