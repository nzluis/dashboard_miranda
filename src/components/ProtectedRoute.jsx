import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { auth } = useAuth()

    return (
        <>
            {auth === '1' ? <Outlet /> : <Navigate to='/login' />}
        </>
    )
}