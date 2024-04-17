import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react"
import { Navigate } from "react-router-dom"
import { LoginContainer } from '../style/LoginStyled'
import { ButtonActive } from "../style/ButtonStyled"
import { FormAbsolute } from '../style/FormStyled'
import { useAuth } from "../context/AuthContext"
import { AuthContextInterface } from "../interfaces/Auth"

export default function Login() {
    const { state, dispatch }: AuthContextInterface = useAuth()
    const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] = useState('admin@example.es')
    const [pass, setPass]: [string, Dispatch<SetStateAction<string>>] = useState('admin')
    const [error, setError]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

    async function handleSubmit(e: SyntheticEvent): Promise<void> {
        e.preventDefault()
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, pass })
        })
        const userRequest: any = await response.json()
        if (!response.ok) {
            console.error(`Server returns ${userRequest.statusCode} error: "${userRequest.message}"`)
            setError(true)
        }
        else {
            dispatch({
                type: 'LOGIN', payload: userRequest
            })
            setError(false)
        }
    }

    const result = state.isAuthenticated ? (
        <Navigate to='/' />
    ) : (
        <LoginContainer>
            <FormAbsolute $width={'login'} onSubmit={(e: SyntheticEvent) => handleSubmit(e)}>
                <label htmlFor="email">Email:
                    <input

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.es"
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