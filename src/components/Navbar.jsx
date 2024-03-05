import { useContext } from "react"
import { AuthContext } from "../App"

export default function Navbar({ visiblePanel, setVisiblePanel }) {
    const { auth, setAuth } = useContext(AuthContext)
    return (
        <div style={{ gridArea: 'navbar' }}>
            <button onClick={() => setVisiblePanel(prev => !prev)}> {visiblePanel ? 'Hide Panel' : 'Show Panel'} </button>
            <h1>Navbar</h1>
            {auth && <button onClick={() => setAuth(false)}>Log Out</button>}
        </div>
    )
}