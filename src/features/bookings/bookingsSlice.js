import { createSlice } from "@reduxjs/toolkit";
import { createBooking, deleteBookingById, fetchBookingById, fetchBookings, updateBooking } from "./bookingsThunk";

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {data: [], dataById: null, status: 'idle', error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.status = 'rejected'
                state.bookings.error = action.error.message
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.data = action.payload ? action.payload : state.data
                state.status = 'fulfilled'
            })
            .addCase(fetchBookingById.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchBookingById.rejected, (state, action) => {
                state.status = 'rejected'
                state.bookings.error = action.error.message
            })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.dataById = state.data.find(booking => booking.id === action.payload)
                state.status = 'fulfilled'
            })
            .addCase(createBooking.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.status = 'rejected'
                state.bookings.error = action.error.message
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.data.push(action.payload)
                state.status = 'fulfilled'
            })
            .addCase(updateBooking.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.status = 'rejected'
                state.bookings.error = action.error.message
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.data = state.data.map(booking => booking.id === action.payload.id ? action.payload : booking)
                state.status = 'fulfilled'
            })
            .addCase(deleteBookingById.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(deleteBookingById.rejected, (state, action) => {
                state.status = 'rejected'
                state.bookings.error = action.error.message
            })
            .addCase(deleteBookingById.fulfilled, (state, action) => {
                state.data = state.data.filter(booking => booking.id !== action.payload)
                state.status = 'fulfilled'
            })
    }
})

export const bookingsData = state => state.bookings.data
export const bookingByIdData = state => state.bookings.dataById
export const bookingsStatus = state => state.bookings.status
export const bookingsError = state => state.bookings.error