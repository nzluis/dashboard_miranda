import { useContext } from "react"
import { AuthContext } from "../App"
import { useLocation } from "react-router-dom"

export default function Navbar({ visiblePanel, setVisiblePanel }) {
    const { auth, setAuth } = useContext(AuthContext)
    const { pathname } = useLocation()
    const titleName = pathname[1] ? pathname.match(/\/[^/]+/)[0] : false

    return (
        <div style={{ gridArea: 'navbar' }}>
            <button onClick={() => setVisiblePanel(prev => !prev)}> {visiblePanel ? 'Hide Panel' : 'Show Panel'} </button>
            <h1>{titleName && titleName[1].toUpperCase() + titleName.slice(2)}</h1>
            {auth === '1' && <button onClick={() => setAuth('0')}>Log Out</button>}
        </div>
    )
}