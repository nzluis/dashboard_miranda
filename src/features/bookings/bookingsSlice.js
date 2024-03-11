import { createSlice } from "@reduxjs/toolkit";
import { createBooking, deleteBookingById, fetchBookingById, fetchBookings, updateBooking } from "./bookingsThunk";

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {data: [], status: 'idle', error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.data = action.payload
                // state.status = 'fulfilled'
            })
            // .addCase(fetchBookings.pending, (state) => {
            //     state.status = 'pending'
            // })
            // .addCase(fetchBookings.rejected, (state, action) => {
            //     state.status = 'rejected'
            //     state.bookings.error = action.error.message
            // })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                const updateBooking = state.data.find(booking => booking.id === action.payload.id)
                updateBooking = action.payload
            })
            .addCase(deleteBookingById.fulfilled, (state, action) => {
                state.data.filter(booking => booking.id !== action.payload)
            })
    }
})

export const allBookings = state => state.bookings.data
export const allBookingsStatus = state => state.bookings.status
export const allBookingsError = state => state.bookings.error