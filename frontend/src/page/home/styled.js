import styled from 'styled-components';


export const Container = styled.main`

    background-color: #002570;

    width: 100%;
    min-height: 100vh;
`

export const Header = styled.header`
    min-height: 30vh;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 10em;
    }
`;

export const Form = styled.form`
    background-color: #fff;
    min-height: 70vh;
    border-radius: 100px 0 0 0;

    display: flex;
    flex-direction: column;
    align-items: center;


    padding: 4em 2em 0 2em;

    label{
        display: flex;
        align-items: center;

        font-size: 25px;
        margin-bottom: 1em;
    }

    input, button{
        width: 100%;
        max-width: 500px;
        height: 50px;
    }

    input{
        margin-bottom: 2em;
        border: none;
        border-bottom: 2px solid #002570;
    }
    span {
        font-size: 13px;
        cursor: pointer;
    }
    button{

        border: none;
        cursor: pointer;
        background: transparent;
        width: 100%;

        margin-top: 2em;
        border: none;
        border-radius: 13px;
        background-color: #002570;
        color: #fff;
        font-weight: bold;
        
    }
`;