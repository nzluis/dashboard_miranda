import { Outlet } from "react-router-dom";
import Panel from "../components/Panel";
import Navbar from "../components/Navbar"
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { RootStyled } from "../style/RootStyled";

export default function Root() {
    const [visiblePanel, setVisiblePanel] = useState(true)
    const { state } = useAuth()
    return (
        <RootStyled $visiblePanel={visiblePanel}>
            {state.isAuthenticated && <Navbar visiblePanel={visiblePanel} setVisiblePanel={setVisiblePanel} />}
            {visiblePanel && state.isAuthenticated && <Panel />}
            <Outlet />
        </RootStyled>
    )
}