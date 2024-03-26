import rooms from '../../assets/data/rooms.json'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomData } from '../../interfaces/Rooms';

const delay = (data: any, time = 200) => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}
let fetchedData: RoomData[]
function getData(json: RoomData[]): RoomData[] | false {
    if (!fetchedData) {
        fetchedData = json
        return fetchedData
    }
    return false
}
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    return await delay(getData(rooms))
})

export const fetchRoomById = createAsyncThunk('rooms/fetchRoomById', async (id) => {
    return await delay(id)
})

export const createRoom = createAsyncThunk('rooms/createRoom', async (newRoom: RoomData) => {
    return await delay({ ...newRoom })
})

export const updateRoom = createAsyncThunk('rooms/updateRoom', async (updatedRoom: RoomData) => {
    return await delay({ ...updatedRoom })
})

export const deleteRoomById = createAsyncThunk('rooms/deleteRoomById', async (id) => {
    return await delay(id)
})