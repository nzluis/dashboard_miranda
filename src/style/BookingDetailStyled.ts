import styled, { css } from "styled-components";
import { ButtonActive } from "./ButtonStyled";

const CommonSides = styled.div`
width: 50%;
height: 100%;
`

export const LeftSide = styled(CommonSides)`
    background-color: white;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 30px;
    h1 {
        margin-bottom: 5px;
    }
    &>p:nth-child(2) {
        font-size: 16px;
        font-weight: 600;
        color: var(--panel-inactive)
    }
    
    hr {
        border: 1px solid var(--panel-inactive);
        opacity: .4;
        margin-bottom: 20px;
        @media only screen and (max-width: 1400px) {
            margin-bottom: 10px;
        }
    }
    &>p:nth-last-of-type(1) {
        margin: 25px 0 15px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--panel-inactive)
    }
    @media only screen and (max-width: 1400px) {
        padding: 5px 20px;
    }
`
interface Props {
    $insidebox?: boolean
}

export const CheckDatesBox = styled.div<Props>`
    display: flex;
    gap: 25px;
    h5 {
        font-size: 16px;
        font-weight: 600;
        color: var(--panel-inactive)
    }
    p {
        font-weight: 500;
        margin-bottom: 20px;
        @media only screen and (max-width: 1400px) {
            margin-bottom: 10px;
        }
    }
    ${props => props.$insidebox && css`
        width: 50%;
        flex-direction: column;
        gap: 5px
    `}
`

export const RoomBox = styled.div<Props>`
    display: flex;
    gap: 25px;
    h5 {
        font-size: 16px;
        font-weight: 600;
        color: var(--panel-inactive)
    }
    p {
        font-weight: 600;
        margin-bottom: 20px;
    }
    span {
        font-weight: 400;
        color: var(--panel-inactive);
    }
    ${props => props.$insidebox && css`
        width: 50%;
        flex-direction: column;
        gap: 5px
    `}
`

export const FacilitiesContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: stretch;
    flex-wrap: wrap;
    gap: 25px;
    @media only screen and (max-width: 1400px) {
        width: 100%;
        gap: 10px;
    }
`

export const FacilitiesCard = styled.div`
    background-color: var(--amenities);
    color: var(--padding-second);
    font-size: 18px;
    font-weight: 500;
    border-radius: 10px;
    padding: 15px 25px;
    width: min-content;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    @media only screen and (max-width: 1400px) {
        font-size: 12px;
        font-weight: 400;
        padding: 5px 10px;

    }
`

interface Props {
    $backColor?: string
}

export const RightSide = styled(CommonSides) <Props>`
    background-size: cover;
    background-position: right;
    position: relative;
    overflow: hidden;
    h3 {
        position: absolute;
        z-index: 2;
        top: 4%;
        left: 64%;
        transform: rotate(35deg);
        padding: 10px 100px;
        background-color: ${props => props.$backColor === 'Booked' ? 'var(--padding-first)' : 'var(--padding-second)'};;
        color: white;
    @media only screen and (max-width: 1400px) {
        font-size: 14px;
    }
    }
    section {
        border-bottom-right-radius: 20px;
        position: absolute;
        height: max-content;
        width: 100%;
        bottom: 0;
        background-color: black;
        opacity: .6;
        color: var(--bg-dashboard);
        padding: 30px;
        z-index: 2;
        h2 {
            margin-bottom: 10px;
        }
    }
    .mySwiper {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    .swiper-slide img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: right;
    } 
    .swiper-button-next,
    .swiper-button-prev{
        color:white;
        background-color: rgba(0,0,0,0.2);
        border-radius: 10px;
        padding: 30px;
        border: 1px solid rgba(250,250,250,.4)
    }
    .swiper-button-next:hover,
    .swiper-button-prev:hover{
        background-color: rgba(0,0,0,0.6);
    }

`

export const SameRowContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 10px;
`

export const ButtonDetail = styled(ButtonActive)`
    margin: 20px 0;
    display: flex;
    gap: 5px;
`