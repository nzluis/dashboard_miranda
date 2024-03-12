import styled, { css } from "styled-components";

const CommonSides = styled.div`
width: 50%;
height: 100%;
padding: 30px;
`

export const LeftSide = styled(CommonSides)`
    background-color: white;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    p {
        &:nth-of-type(1) {
            font-size: 16px;
            font-weight: 600;
            color: var(--panel-inactive)
        }
    }
`

export const CheckDatesBox = styled.div`
    display: flex;
    gap: 25px;
    ${props => props.insidebox && css`
        flex-direction: column;
        gap: 5px
    `}

`
export const RightSide = styled(CommonSides)`
    background-color: var(--panel-inactive);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
`