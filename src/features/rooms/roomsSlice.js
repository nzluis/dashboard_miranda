import { createSlice } from "@reduxjs/toolkit";
import { createRoom, deleteRoomById, fetchRoomById, fetchRooms, updateRoom } from "./roomsThunk";

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState: {data: [], dataById: null, status: 'idle', error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf ( 
                fetchRooms.pending,
                fetchRoomById.pending,
                createRoom.pending,
                updateRoom.pending
                ), (state) => {
                    state.status = 'pending'
            })
            .addMatcher(isAnyOf ( 
                fetchRooms.rejected,
                fetchRoomById.rejected,
                createRoom.rejected,
                updateRoom.rejected
                ), (state, action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.data = action.payload ? action.payload : state.data
                state.status = 'fulfilled'
            })
            .addCase(fetchRoomById.fulfilled, (state, action) => {
                state.dataById = state.data.find(room => room.id === action.payload)
                state.status = 'fulfilled'
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.data.push(action.payload)
                state.status = 'fulfilled'
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                state.data = state.data.map(room => room.id === action.payload.id ? action.payload : room)
                state.status = 'fulfilled'
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