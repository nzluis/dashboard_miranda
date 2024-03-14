import { createContext, useContext } from "react"
import useReducerWithLocalStorage from "../../hooks/useReducerWithLocalStorage"

const AuthContext = createContext()
const initializer = {
    isAuthenticated: false,
    user: null
}
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                user: null
            }
        case 'EDIT':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducerWithLocalStorage({
        key: 'USER_AUTH',
        reducer: authReducer,
        initializer
    })
    const value = { state, dispatch }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}