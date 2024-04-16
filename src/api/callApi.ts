import { BookingData } from "../interfaces/Bookings"
import { ContactData } from "../interfaces/Contacts"
import { RoomData } from "../interfaces/Rooms"
import { UserData } from "../interfaces/Users"

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const token = `Bearer ${import.meta.env.VITE_DEV_TOKEN}`
type Data = BookingData | RoomData | ContactData | UserData

export const callApi = async (path: string, method: string = 'GET', data: Data | string | null = null) => {
    try {
        const options = {
            method,
            headers: {
                "Authorization": token,
                "Content-type": "application/json"
            },
            body: data ? JSON.stringify(data) : null
        }
        const response = await fetch(`${BASE_URL}/${path}`, options)
        const json = response.json()
        if (!response.ok) console.error(`Server return a ${response.status} error code`)
        else return json
    } catch (error: any) {
        throw new Error(error)
    }
}