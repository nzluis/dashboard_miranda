import styled, { css } from "styled-components";

interface Props {
    $flex?: boolean
}

export const DashBoard = styled.div<Props>`
    background-color: var(--bg-dashboard);
    overflow: scroll;
    padding: 40px 50px;
    ${props => props.$flex && css`
    display: flex;
    `}
    @media only screen and (max-width: 1400px) {
        padding: 20px 30px;
        
    }

`
export const PinkBox = styled.div`
    width: 65px;
    height: 65px;
    background-color: var(--bg-lightPink);
    border-radius: 8px;
    position: relative;
    cursor:pointer;
    *{
        overflow: visible;
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-25%);
        color: var(--padding-first);
    }
`

export const KPIs = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 5px;
    >div {
        width: 20%;
        height: 125px;
        display: flex;
        align-items: center;
        gap: 15px;
        background-color: #FFFFFF;
        padding: 0 20px;
        border-radius: 12px;

        &:hover {
            cursor: pointer;
            ${PinkBox} {
                background-color: var(--padding-first);
                * {
                    color: white;
                }
            }
        }
    }
    
    h6 {
        font-size: 35px;
        font-weight: 600;
        color: var(--black-primary);
    }

    p {
        font-size: 15px;
        font-weight: 300;
        color: #787878;
    }
`