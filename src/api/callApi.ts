import { AuthState } from "../interfaces/Auth"
import { BookingData } from "../interfaces/Bookings"
import { ContactData } from "../interfaces/Contacts"
import { RoomData } from "../interfaces/Rooms"
import { UserData } from "../interfaces/Users"

const BASE_URL = import.meta.env.VITE_API_BASE_URL
type Data = BookingData | RoomData | ContactData | UserData


export const callApi = async (path: string, method: string = 'GET', data: Data | string | null = null) => {
    const auth: AuthState = JSON.parse(localStorage.getItem("USER_AUTH") as string)
    try {
        const options = {
            method,
            headers: {
                "Authorization": auth.user ? `Bearer ${auth.user.token}` : 'noToken',
                "Content-type": "application/json"
            },
            body: data ? JSON.stringify(data) : null
        }
        const response = await fetch(`${BASE_URL}/${path}`, options)
        const json = await response.json()
        if (!response.ok) console.error(`Server returns ${json.statusCode} error: "${json.message}" `)
        else return json
    } catch (error: any) {
        throw new Error(error)
    }
}

