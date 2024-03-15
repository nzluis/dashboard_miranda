import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createBooking, deleteBookingById, fetchBookingById, fetchBookings, updateBooking } from "./bookingsThunk";

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {data: [], dataById: null, status: 'idle', error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBookings.fulfilled, (state, action) => {
            state.data = action.payload ? action.payload : state.data
                state.status = 'fulfilled'
            })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.dataById = state.data.find(booking => booking.id === action.payload)
                state.status = 'fulfilled'
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.data.push(action.payload)
                state.status = 'fulfilled'
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.data = state.data.map(booking => booking.id === action.payload.id ? action.payload : booking)
                state.status = 'fulfilled'
            })
            .addCase(deleteBookingById.fulfilled, (state, action) => {
                state.data = state.data.filter(booking => booking.id !== action.payload)
                state.status = 'fulfilled'
            })
            .addMatcher(isAnyOf( 
                fetchBookings.pending,
                fetchBookingById.pending,
                createBooking.pending,
                updateBooking.pending,
                deleteBookingById.pending
                ), (state) => {
                    state.status = 'pending'
            })
            .addMatcher(isAnyOf( 
                fetchBookings.rejected,
                fetchBookingById.rejected,
                createBooking.rejected,
                updateBooking.rejected,
                deleteBookingById.rejected
                ), (state, action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
            })
    }
})

export const bookingsData = state => state.bookings.data
export const bookingByIdData = state => state.bookings.dataById
export const bookingsStatus = state => state.bookings.status
export const bookingsError = state => state.error