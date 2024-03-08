import { Outlet } from "react-router-dom";
import Panel from "../components/Panel";
import Navbar from "../components/Navbar"
import { useState } from "react";

export default function Root() {
    const [visiblePanel, setVisiblePanel] = useState(true)
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
            <Navbar visiblePanel={visiblePanel} setVisiblePanel={setVisiblePanel} />
            {visiblePanel && <Panel />}
            <Outlet />
        </div>
    )
}