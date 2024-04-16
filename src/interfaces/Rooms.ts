export type RoomData = {
    _id?: string
    photo: string
    room_number: string
    room_type: string
    description: string
    offer: boolean
    price: string
    discount: string
    cancelation: string
    amenities: string[]
    status: string
}


export interface RoomState {
    data: RoomData[]
    dataById: RoomData | undefined
    status: string
    error: string | null
}