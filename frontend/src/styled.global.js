import { createGlobalStyle } from 'styled-components';

const GlobalStyled = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        font-family: "Poppins", sans-serif;

    }

    input,select {
        outline: none;
    }

    a {
        text-decoration: none;
    }
`

export default GlobalStyled