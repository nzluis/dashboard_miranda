import { ReactNode } from 'react'

export interface AuthState {
    isAuthenticated: boolean
    user: null | {
        id: string
        email: string
        name: string
        token: string
        photo: string
    }
}

export interface AuthAction {
    type: 'LOGIN' | 'LOGOUT' | 'EDIT'
    payload?: null | {
        id: string
        email: string
        name: string
        token: string
        photo: string
    }
}

export interface AuthProps {
    children: ReactNode
}

export interface AuthContextInterface {
    state: AuthState
    dispatch: React.Dispatch<AuthAction>
}
