import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingData } from '../../interfaces/Bookings';
import { callApi } from '../../api/callApi';
import { DELETE, POST, PUT } from "../../helpers/constants";

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    return await callApi('bookings')
})

export const fetchBookingById = createAsyncThunk('bookings/fetchBookingById', async (id: string) => {
    return await callApi(`bookings/${id}`)
})

export const createBooking = createAsyncThunk('bookings/createBooking', async (newBooking: BookingData) => {
    return await callApi(`bookings/create`, POST, newBooking)
})

export const updateBooking = createAsyncThunk('bookings/updateBooking', async (updatedBooking: BookingData) => {
    return await callApi(`bookings/${updatedBooking._id}/update`, PUT, updatedBooking)
})

export const deleteBookingById = createAsyncThunk('bookings/deleteBookingById', async (id: string) => {
    return await callApi(`bookings/${id}/delete`, DELETE)
})