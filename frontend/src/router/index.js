import { createBrowserRouter, Outlet } from "react-router-dom";
import { ToastContainer, Slide, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import GlobalStyled from '../styled.global';

import ProviderAuth from '../contexts/auth';
import Logado from "./logado";

import Home from "../page/home";
import Painel from "../page/painel";
import Produtos from "../page/produtos";
import AlterarEstoque from "../page/Alterar_estoque";

import Error from "../page/Error";
import apiBase from "../api";

const AppWrapper = () => (
    <ProviderAuth>
      <GlobalStyled />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <Outlet />
    </ProviderAuth>
  );

  const router = createBrowserRouter([
    {
        path: '/',
        element: <AppWrapper />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
              path: '/painel',
              element: (
                  <Logado>
                      <Painel />
                  </Logado>
                ),
            },
            {
              path: '/produtos/:nome_produto',
              element: (
                <Logado>
                  <Produtos/>
                </Logado>
              )
            },
            {
              path: '/produto/alterar/:id_produto',
              loader: async ({params}) => {
                try{
                  const [codigo, descricao] = await Promise.all([
                      apiBase.get('/codigo'),
                      apiBase.get(`produto/${params.id_produto}`)
                  ])

                  return {
                    id_produto: params.id_produto,
                    codigoEnt: codigo.data.codigoEnt,
                    codigoBalanco: codigo.data.codigoBalanco,
                    descricao: descricao.data
                    
                  }

                }catch(err){
                  console.error(err);
                  toast.error('Algo deu errado');
                }
              },
              element: (
                <Logado>
                  <AlterarEstoque/>
                </Logado>
              )
            },
            {
                path: '*',
                element: <Error />,
            },
        ],
    },
]);

export default router