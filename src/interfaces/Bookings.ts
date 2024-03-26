export type BookingData = {
    id: string
    order_date: string
    first_name: string
    last_name: string
    check_in: string
    check_out: string
    request: string
    room_type: string
    room_number: string
    status: string
}

export interface BookingState {
    data: BookingData[]
    dataById: BookingData | undefined
    status: string
    error: string | null
}