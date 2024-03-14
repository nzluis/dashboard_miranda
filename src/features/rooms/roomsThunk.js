import rooms from '../../assets/data/rooms.json'
import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 200)
    })
}
let firstFetch = false
export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async() => {
    if (!firstFetch) {
        const data = await delay(rooms)
        firstFetch = true
        return data
    }
    return delay(false)
    // return await delay(rooms)
})

export const fetchRoomById = createAsyncThunk('rooms/fetchRoomById', async(id) => {
    return await delay(id)
})

export const createRoom = createAsyncThunk('rooms/createRoom', async(newRoom) => {
    return await delay({...newRoom})
})

export const updateRoom = createAsyncThunk('rooms/updateRoom', async(updatedRoom) => {
    return await delay({...updatedRoom})
})

export const deleteRoomById = createAsyncThunk('rooms/deleteRoomById', async(id) => {
    return await delay(id)
})