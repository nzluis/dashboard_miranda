import { useContext, useState } from "react"
import { Navigate } from "react-router-dom"
import { LoginContainer } from '../style/LoginStyled'
import { ButtonActive } from "../style/ButtonStyled"
import { Form, FormAbsolute } from '../style/FormStyled'
import { useAuth } from "../context/AuthContext"

export default function Login() {
    const { state, dispatch } = useAuth()
    const [email, setEmail] = useState('admin@example.es')
    const [pass, setPass] = useState('admin')
    const [error, setError] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        if (email === 'admin@example.es' && pass === 'admin') {
            dispatch({
                type: 'LOGIN', payload: {
                    email,
                    fullName: 'Luis Navarro'
                }
            })
            setError(false)
        }
        else setError(true)
    }

    const result = state.isAuthenticated ? (
        <Navigate to='/' />
    ) : (
        <LoginContainer>
            <FormAbsolute width={'login'} onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="email">Email:
                    <input

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        type="email"
                        name="email"
                    />
                </label>
                <label htmlFor="password">Password:
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="admin"
                        type="password"
                        name="password"
                    />
                </label>
                {error && <p>Incorrect Authentication: try again with 'admin@example.es' and 'admin' </p>}
                <ButtonActive>Log in</ButtonActive>
            </FormAbsolute>
        </LoginContainer>
    )

    return (
        <>
            {result}
        </>
    )
}