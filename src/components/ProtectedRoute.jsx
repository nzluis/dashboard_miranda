import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../App'

export default function ProtectedRoute() {
    const { auth } = useContext(AuthContext)

    return (
        <>
            {auth === '1' ? <Outlet /> : <Navigate to='/login' />}
        </>
    )
}