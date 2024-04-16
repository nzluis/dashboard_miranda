export type UserData = {
    _id?: string
    photo: string
    full_name: string
    email: string
    start_date: string
    description: string
    position: string
    phone: string
    status: string
    password: string
}

export interface UserState {
    data: UserData[]
    dataById: UserData | undefined
    status: string
    error: string | null
}