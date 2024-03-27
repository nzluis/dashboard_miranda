import styled from "styled-components";

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;

    button {
    background-color: white;
    padding: 0 25px;
    height: 45px;
    border-radius: 12px;
    margin: 5px 0;
    border: 1px solid var(--padding-second);
    color: var(--padding-second);
    font-size: 16px;
    font-weight: 500;
    }
` 

export const Pages = styled.div`
    display: flex;
    list-style-type: none;
    gap: 5px;
` 

export const Page = styled.li`
    height: 45px;
    padding-top: 10px;
    width: 45px;
    border-radius: 12px;
    text-align: center;
    position:relative;
    cursor: pointer;
`
export const PageSelected = styled(Page)`
    background-color: var(--padding-second);
    color: white;
`