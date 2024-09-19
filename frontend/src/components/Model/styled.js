import styled from "styled-components";

export const Container = styled.article`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(225,225,225, 0.9);
    overflow: auto;

    div{
        &:first-child{
            margin: 1em auto;
            border-radius: 13px;
            background-color: #fff;

            max-width: 1080px;
            width: 90%;

            height: auto; 
        }
    }

    button {
        max-width: 1080px;
        width: 90%;
        height: 10vh;
        border-radius: 13px;
        background-color: #75FD79;

        font-weight: bold;
        margin-bottom: 1em;
    }

`;



export const Modelo = styled.div`

    margin: 1em auto;
    border-radius: 13px;
    background-color: #fff;

    max-width: 1080px;
    width: 90%;

    height: auto; 
    button {
        font-size: 25px;
    }

    h3{
        margin-top: 0.5em;
        overflow: auto;
    }

`
