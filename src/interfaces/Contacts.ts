export type ContactData = {
    _id: string
    full_name: string
    email: string
    phone: string
    subject: string
    message: string
    status: string
    date: string
}

export interface ContactState {
    data: ContactData[]
    dataById: ContactData | undefined
    status: string
    error: string | null
}