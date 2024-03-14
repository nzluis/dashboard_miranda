import { createSlice } from "@reduxjs/toolkit";
import { createRoom, deleteRoomById, fetchRoomById, fetchRooms, updateRoom } from "./roomsThunk";

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {data: [], dataById: null, status: 'idle', error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.data = action.payload ? action.payload : state.data
                state.status = 'fulfilled'
            })
            .addCase(fetchRoomById.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchRoomById.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(fetchRoomById.fulfilled, (state, action) => {
                state.dataById = state.data.find(room => room.id === action.payload)
                state.status = 'fulfilled'
            })
            .addCase(createRoom.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(createRoom.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.data.push(action.payload)
                state.status = 'fulfilled'
            })
            .addCase(updateRoom.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(updateRoom.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                state.data = state.data.map(room => room.id === action.payload.id ? action.payload : room)
                state.status = 'fulfilled'
            })
            .addCase(deleteRoomById.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(deleteRoomById.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(deleteRoomById.fulfilled, (state, action) => {
                state.data = state.data.filter(room => room.id !== action.payload)
                state.status = 'fulfilled'
            })
    }
})

export const roomsData = state => state.rooms.data
export const roomByIdData = state => state.rooms.dataById
export const roomsStatus = state => state.rooms.status
export const roomsError = state => state.error