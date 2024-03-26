import { ReactNode } from 'react'

export interface AuthState {
    isAuthenticated: boolean
    user: null | {
        email: string
        fullName: string
    }
}

export interface AuthAction {
    type: 'LOGIN' | 'LOGOUT' | 'EDIT'
    payload: null | {
        email: string
        fullName: string
    }
}

export interface AuthProps {
    children: ReactNode
}

export interface AuthContextInterface {
    state: AuthState
    dispatch: React.Dispatch<AuthAction>
}
