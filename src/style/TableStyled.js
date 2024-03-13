import styled from "styled-components";

export const StyledTable = styled.table`
    width: 100%;
    background-color: #ffffff;
    border-radius: 20px;
    padding: 20px 30px;
    border-collapse: collapse;
    `

export const StyledTableHead = styled.thead`
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: var(--black-primary);
    line-height: 25px;
    tr {
        border-bottom: 3px solid var(--bg-dashboard);
        th {
            padding: 20px 7px;
            &:first-child{
                padding-left: 30px;
            }
        }
    }
    `

export const StyledTableBody = styled.tbody`
    tr{
        font-size: 16px;
        font-weight: 400;
        color: var(--black-primary);
        line-height: 25px;
        cursor:${props => props.$noPointer ? 'default' : 'pointer'};
        
        td {
            padding: 20px 7px;
            &:not(:first-child) {
                vertical-align: ${props => props.$position === 'bottom' ? 'bottom' : 'top' }
            }
            
            &:first-child{
                padding-left: 30px;
            }
            .highlight {
                font-weight: 600;
                color: var(--black-primary)
            }
            .lighter {
                font-weight: 200;
            }
            .panelColor {
                color: var(--panel-inactive);
            }

            .request {
                color: var(--black-third);
                background-color: var(--bg-notes);
                width: fit-content;
                padding: 12px 25px;
                border-radius: 12px;
                cursor: pointer;
            }

            .request:hover {
                box-shadow: 0px 0px 3px 0px var(--padding-second);
            }
            
            .bookingStatus {
                background-color: var(--bg-notes);
                width: fit-content;
                width: 109px;
                height: 48px;
                border-radius: 12px;
                display: flex;
                justify-content: center;
                align-items: center;

                &.red {
                    background-color: var(--bg-lightPink);
                    color: var(--padding-first);
                }
                &.green {
                    background-color: var(--bg-lightGreen);
                    color: var(--hg-green);
                }
                &.yellow {
                    background-color: var(--bg-lightYellow);
                    color: var(--hg-yellow);
                }
            }

            .twoLines {
                max-width: 250px;
            }
            
            .moreLines {
                max-width: 400px;
            }

            svg {
                &:nth-of-type(1) {
                    color: var(--padding-second)
                }
                &:nth-of-type(2) {
                    color: var(--padding-first);
                }
            }
            svg:hover {
                transform: scale(1.1);
            }
        }
    }

    tr:hover {
        box-shadow: 0 4px 30px #00000014;
    }
`

export const TdActions = styled.td`
    display: flex;
    justify-content: space-between;
    
`