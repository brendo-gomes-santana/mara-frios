import styled from 'styled-components';

export const Container = styled.header`

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #002570;

    width: 100%;
    min-height: 10vh;

    margin-bottom: 2em;
    position: relative;

    img{
        width: 100px;
    }

    button{
        position: absolute;
        left: 20px;
        top: 15px;
        background: transparent;
        border: none;
        cursor: pointer;
    }
`;