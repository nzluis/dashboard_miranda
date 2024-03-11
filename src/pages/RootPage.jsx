import { Outlet } from "react-router-dom";
import Panel from "../components/Panel";
import Navbar from "../components/Navbar"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Root() {
    const [visiblePanel, setVisiblePanel] = useState(true)
    const { auth } = useAuth()

    return (
        <div style={{
            display: 'grid',
            width: '100vw',
            height: '100vh',
            gridTemplateColumns: visiblePanel ? '345px 1fr' : '1fr',
            gridTemplateRows: '125px 1fr',
            gridTemplateAreas: visiblePanel ?
                `'panel navbar'
                'panel dashboard'` :
                `'navbar'
                'dashboard'`

        }}>
            {auth === '1' && <Navbar visiblePanel={visiblePanel} setVisiblePanel={setVisiblePanel} />}
            {visiblePanel && auth === '1' && <Panel />}
            <Outlet />
        </div>
    )
}