import { createSlice } from "@reduxjs/toolkit";
import { createBooking, deleteBookingById, fetchBookingById, fetchBookings, updateBooking } from "./bookingsThunk";

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {data: [], dataById: null, status: 'idle', error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.data = action.payload ? action.payload : state.data
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
                state.dataById = action.payload
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(deleteBookingById.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})

export const bookingsData = state => state.bookings.data
export const bookingByIdData = state => state.bookings.dataById
export const allBookingsStatus = state => state.bookings.status
export const allBookingsError = state => state.bookings.error