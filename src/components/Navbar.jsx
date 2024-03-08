import { useContext } from "react"
import { AuthContext } from "../App"
import { NavLink, useLocation, useParams } from "react-router-dom"
import { PiSignOutBold } from "react-icons/pi";
import { FaRegEnvelope, FaRegBell } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { NavBar, NavIcons } from "../style/NavbarStyled";


export default function Navbar({ visiblePanel, setVisiblePanel }) {
    const { auth, setAuth } = useContext(AuthContext)
    const { pathname } = useLocation()
    const titleName = pathname[1] ? pathname.match(/\/[^/]+/)[0] : false
    const { id } = useParams()

    function togglePanel() {
        setVisiblePanel(prev => !prev)
    }

    return (
        <NavBar>
            <div>
                {visiblePanel ? <FaArrowLeft size={26} onClick={togglePanel} /> : <FaArrowRight size={26} onClick={togglePanel} />}
                <h1>{titleName && titleName[1].toUpperCase() + titleName.slice(2)}</h1>
                {id && <h2># {id}</h2>}
            </div>
            <NavIcons>
                <NavLink to="/contact" >
                    <FaRegEnvelope size={26} />
                </NavLink>
                <NavLink>

                    <FaRegBell size={26} />
                </NavLink>
                <NavLink>
                    {auth === '1' && <PiSignOutBold size={26} onClick={() => setAuth('0')} />}
                </NavLink>

            </NavIcons>
        </NavBar>
    )
}