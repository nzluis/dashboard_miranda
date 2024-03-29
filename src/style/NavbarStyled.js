import styled from "styled-components";

export const NavBar = styled.div`
    grid-area: 'navbar';
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px;
    >div {
        display: flex;
        align-items: center;
        gap:50px;
    }

    svg {
        cursor: pointer;
    }
    
    svg:hover {
        transform: scale(1.1);

    }

    h1, h2 {
        font-size: 30px;
        font-weight: 600;
        color: var(--black-secondary);
    }
    h2 {
        font-size: 25px;
    }
`
export const NavIcons = styled.div`
    color: var(--padding-second);
`
