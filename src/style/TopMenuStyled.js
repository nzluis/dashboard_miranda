import styled from "styled-components";

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

export const Tab = styled.li`
    cursor: pointer;
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

