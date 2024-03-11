import { NavLink, useLocation } from "react-router-dom"
import { PiSignOutBold } from "react-icons/pi";
import { FaRegEnvelope, FaRegBell } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { NavBar, NavIcons } from "../style/NavbarStyled";
import { useAuth } from "../context/AuthContext";


export default function Navbar({ visiblePanel, setVisiblePanel }) {
    const { state, dispatch } = useAuth()
    const { pathname } = useLocation()
    const regexMatch = pathname.match(/\/[^/]+/g)
    const titleName = pathname[1] ? regexMatch[0][1].toUpperCase() + regexMatch[0].slice(2) : 'Dashboard'
    const subTitleName = regexMatch !== null && regexMatch[1] ? regexMatch[1].replace('-', ' ').slice(1) : false

    function togglePanel() {
        setVisiblePanel(prev => !prev)
    }

    return (
        <NavBar>
            <div>
                {visiblePanel ? <HiOutlineBars3BottomLeft size={26} onClick={togglePanel} /> : <FaArrowRight size={26} onClick={togglePanel} />}
                <h1>{titleName === 'Login' ? '' : titleName}</h1>
                {subTitleName && <h2>{subTitleName.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}</h2>}
            </div>
            <NavIcons>
                <NavLink to="/contact" >
                    <FaRegEnvelope size={26} />
                </NavLink>
                <NavLink>

                    <FaRegBell size={26} />
                </NavLink>
                <NavLink>
                    {state.isAuthenticated && <PiSignOutBold size={26} onClick={() => dispatch({ type: 'LOGOUT' })} />}
                </NavLink>

            </NavIcons>
        </NavBar>
    )
}