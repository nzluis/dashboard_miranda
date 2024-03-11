import styled from "styled-components";

export const RootStyled = styled.div`
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-columns: ${props => props.visiblepanel === 'true' ? '345px 1fr' : '1fr'};
    grid-template-rows: 125px 1fr;
    grid-template-areas: ${props => props.visiblepanel === 'true' ?
        `'panel navbar'
        'panel dashboard'` :
        `'navbar'
        'dashboard'`}
`