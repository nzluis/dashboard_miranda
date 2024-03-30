import styled from "styled-components";

export const ButtonActive = styled.button`
    border: none;
    padding: 15px 30px;
    border-radius: 12px;
    background-color: var(--padding-second);
    color: white;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
`
interface Props {
    $notAllow?: boolean
}

export const ButtonSecondary = styled.button<Props>`
    background-color: white;
    padding: 0 25px;
    height: 45px;
    border-radius: 12px;
    margin: 5px 0;
    border: 1px solid var(--padding-second);
    color: var(--padding-second);
    font-size: 16px;
    font-weight: 500;
    cursor: ${props => props.$notAllow ? 'not-allowed' : 'pointer'}; 
`