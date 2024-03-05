import { useContext } from "react"
import { AuthContext } from "../App"
import { Navigate } from "react-router-dom"

export default function Login() {
    const { auth, setAuth } = useContext(AuthContext)
    console.log(auth)
    const result = auth ? (
        <Navigate to='/dashboard' />
    ) : (
        <div>
            <div>Login</div>
            <button onClick={() => setAuth(true)}>Log in as user</button>
        </div>
    )

    return (
        <>
            {result}
        </>
    )
}