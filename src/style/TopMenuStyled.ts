import styled, { css } from "styled-components";

export const TopMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`

export const TabsContainer = styled.ul`
    list-style-type:none;
    display: flex;
    gap: 30px;
`
interface Props {
    $active?: boolean
}

export const Tab = styled.li<Props>`
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 12px;
    background-color : ${props => props.$active ? 'var(--padding-second)' : 'inherit'};
    color : ${props => props.$active ? 'white' : 'inherit'}
`
export const ButtonsContainer = styled.div`
    select {
        margin-left: 15px;
    }
`

export const SelectOrder = styled.select`
    cursor: pointer;
    background-color: white;
    padding: 15px 30px;
    border-radius: 12px;
    margin: 5px 0;
    border: 1px solid var(--padding-second);
    color: var(--padding-second);
    font-size: 16px;
    font-weight: 500;
`

