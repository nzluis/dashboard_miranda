import { NavLink } from "react-router-dom";
import styled from "styled-components";

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
    margin-left: 25px;
    grid-area: panel;
`

export default function Panel() {
    return (
        <SideBar>
            <NavLink to='/'>Dashboard</NavLink>
            <NavLink to='/rooms'>Rooms</NavLink>
            <NavLink to='/bookings'>Bookings</NavLink>
            <NavLink to='/users'>Users</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
        </SideBar>
    )
}