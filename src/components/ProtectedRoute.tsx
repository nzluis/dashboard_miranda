import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { state } = useAuth()

    return (
        <>
            {state.isAuthenticated ? <Outlet /> : <Navigate to='/login' />}
        </>
    )
}