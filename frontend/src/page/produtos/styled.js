import styled from 'styled-components';

export const Form = styled.form`
    width: 100%;
    max-width: 500px;
    margin: auto;

    input{
        display: block;
        width: 100%;
        height: 50px;
        
        border-radius: 13px;
        background-color: #D9D9D9;
        border: none;
        padding: 0 1em;
    }

    span {
        font-size: 12px;
        color: #ff0000;
    }

    button{
        width: 100%;
        height: 50px;
        background-color: #75FD79;
        border-radius: 13px;
        border: none;
        display: block;
        cursor: pointer;

        margin-top: 0.5em;
    }
`;

export const Table = styled.table`
    border-collapse: collapse;

    width: 100%;
    margin: 1em 0;

    thead{
        background-color: #d3d3d3;
        height: 40px;
    }

    button {
        background: transparent;
        border: none;
        width: 100%;
        height: 40px;

        cursor: pointer;
    }

    tbody{
        tr{
            transition: 0.2s;
            text-align: center;

            height: 40px;

            span {
                font-size: 10px;
                margin-left: 1px;
            }

            &:hover{
                background-color: #d3d3d3;
            }
        }
    }

`