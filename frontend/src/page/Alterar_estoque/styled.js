import styled from "styled-components";

export const ContainerVolta = styled.section`
    width: 100%;
    height: 50px;

    button {
        width: 150px;
        height: 50px;

        border-radius: 13px;
        border: none;
        text-align: start;
        padding: 0 1em;
        cursor: pointer;

        display: flex;
        align-items: center;

        font-weight: bold;
        gap: 0.5em;
    }
`

export const Form = styled.form`
    margin: auto;
    width: 100%;
    max-width: 720px;

    display: flex;
    flex-direction: column;
    h1{
        text-align: center;
        margin: 0.5em 0;
    }
    label {
        margin: 0.7em 0;
        
    }

    button {
        height: 50px;
        border-radius: 13px;
        border: none;
        background-color: #75FD79;
        font-weight: bold;

        margin: 0.5em 0;
    }
`;