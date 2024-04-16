import { RoomData } from "./Rooms"

export type BookingData = {
    _id?: string
    order_date: string
    first_name: string
    last_name: string
    check_in: string
    check_out: string
    request: string
    room?: RoomData
    status: string
}

export interface BookingState {
    data: BookingData[]
    dataById: BookingData | undefined
    status: string
    error: string | null
}