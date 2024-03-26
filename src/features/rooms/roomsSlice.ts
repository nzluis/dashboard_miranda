import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createRoom, deleteRoomById, fetchRoomById, fetchRooms, updateRoom } from "./roomsThunk";
import { RoomState } from "../../interfaces/Rooms";
import { RootState } from "../../app/store";

const initialState: RoomState = { data: [], dataById: undefined, status: 'idle', error: null }

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            .addMatcher(isAnyOf(
                fetchRooms.pending,
                fetchRoomById.pending,
                createRoom.pending,
                updateRoom.pending,
                deleteRoomById.pending
            ), (state) => {
                state.status = 'pending'
            })
            .addMatcher(isAnyOf(
                fetchRooms.rejected,
                fetchRoomById.rejected,
                createRoom.rejected,
                updateRoom.rejected,
                deleteRoomById.rejected
            ), (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message || null
            })
    }
})

export const roomsData = (state: RootState) => state.rooms.data
export const roomByIdData = (state: RootState) => state.rooms.dataById
export const roomsStatus = (state: RootState) => state.rooms.status
export const roomsError = (state: RootState) => state.rooms.error