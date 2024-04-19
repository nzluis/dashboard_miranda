import { createContext, useContext } from "react"
import useReducerWithLocalStorage from "../hooks/useReducerWithLocalStorage"
import { AuthAction, AuthContextInterface, AuthProps, AuthState } from "../interfaces/Auth"

const AuthContext = createContext<AuthContextInterface>({ state: { isAuthenticated: false, user: null }, dispatch: () => { } })
const initializer: AuthState = {
    isAuthenticated: false,
    user: null
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isAuthenticated: true,
                user: action.payload!
            }
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                user: null
            }
        case 'EDIT':
            return {
                ...state,
                user: action.payload!
            }
        default:
            return state
    }
}

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props: AuthProps) {
    const [state, dispatch] = useReducerWithLocalStorage({
        key: 'USER_AUTH',
        reducer: authReducer,
        initializer
    })
    const value: AuthContextInterface = { state, dispatch }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}