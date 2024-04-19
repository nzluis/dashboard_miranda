import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomData } from '../../interfaces/Rooms';
import { callApi } from '../../api/callApi';
import { DELETE, POST, PUT } from "../../helpers/constants";

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async () => {
    return await callApi('rooms')
})

export const fetchRoomById = createAsyncThunk('rooms/fetchRoomById', async (id: string) => {
    return await callApi(`rooms/${id}`)
})

export const createRoom = createAsyncThunk('rooms/createRoom', async (newRoom: RoomData) => {
    return await callApi(`rooms/create`, POST, newRoom)
})

export const updateRoom = createAsyncThunk('rooms/updateRoom', async (updatedRoom: RoomData) => {
    return await callApi(`rooms/${updatedRoom._id}/update`, PUT, updatedRoom)
})

export const deleteRoomById = createAsyncThunk('rooms/deleteRoomById', async (id: string) => {
    return await callApi(`rooms/${id}/delete`, DELETE)
})