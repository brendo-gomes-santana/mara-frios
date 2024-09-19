import styled from 'styled-components';


export const Button = styled.button`
    display: block;
    margin: 1em auto;

    width: 100%;
    max-width: 400px;
    height: 50px;

    font-weight: bold;
    border-radius: 13px;
    border: none;

    cursor: pointer;

    background-color: ${props => props.$brackground};
`;