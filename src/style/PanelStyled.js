import styled from "styled-components";

export const SideBar = styled.div`
    margin: 40px 30px 40px 40px;
    grid-area: panel;
    >svg {
        margin-left: 55px;
    }
`
export const PanelLinks = styled.div`
margin-top: 80px;
display: flex;
flex-direction: column;
gap: 30px;
font-size: 20px;
color: var(--panel-inactive);
>* {
    display: flex;
    gap: 25px;
    align-items: center;
}

>*:not(.LinkActive):hover {
    transform: translateX(2px);
}
`

export const UserBox = styled.div`
    max-width: 235px;
    padding: 45px 25px;
    border-radius: 20px;
    box-shadow: 0px 20px 30px #00000014;
    margin: 70px auto 0 auto;
    text-align: center;
    position: relative;

    img{
        position: absolute;
        background-color: #C5C5C5;
        border-radius: 10px;
        border: 1px solid #C5C5C5;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
    }
    
    h3 {
      color: #393939;
      font-size: 18px;
      font-weight: 500;

    }

    p {
        color: #B2B2B2;
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 15px;
        overflow: hidden;
    }

    button {
        background-color: #EBF1EF;
        color: var(--padding-second);
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        padding: 15px 42px;
        cursor: pointer;
    }

    button:hover {
        box-shadow: 0px 0px 3px 0px var(--padding-second);
    }
`