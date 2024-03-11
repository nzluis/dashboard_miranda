import { createContext, useContext } from "react"
import { useLocalStorage } from "../../hooks/useLocalStorage"

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useLocalStorage('AUTH_KEY', '0')
    const value = { auth, setAuth }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}