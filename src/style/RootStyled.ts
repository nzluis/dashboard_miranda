import styled from "styled-components";

interface Props {
    $visiblePanel?: boolean
}

export const RootStyled = styled.div<Props>`
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-columns: ${props => props.$visiblePanel ? '1fr 4fr' : '1fr'};
    grid-template-rows: 125px 1fr;
    grid-template-areas: ${props => props.$visiblePanel ?
        `'panel navbar'
        'panel dashboard'` :
        `'navbar'
        'dashboard'`};
    @media only screen and (max-width: 1400px) {
        grid-template-rows: 70px 1fr;
    }
`