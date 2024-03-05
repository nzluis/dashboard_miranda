import { NavLink } from "react-router-dom";

export default function Panel() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '25px',
            marginLeft: '25px',
            gridArea: 'panel'
        }}>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            <NavLink to='/rooms'>Rooms</NavLink>
            <NavLink to='/bookings'>Bookings</NavLink>
            <NavLink to='/users'>Users</NavLink>
            <NavLink to='/contact'>Contact</NavLink>
        </div>
    )
}