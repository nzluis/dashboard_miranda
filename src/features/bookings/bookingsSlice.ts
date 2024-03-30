import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createBooking, deleteBookingById, fetchBookingById, fetchBookings, updateBooking } from "./bookingsThunk";
import type { RootState } from '../../app/store'
import type { BookingData, BookingState } from '../../interfaces/Bookings'

export const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: { data: [], dataById: {} as BookingData, status: 'idle', error: null } as BookingState,
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
                state.error = action.error.message || null
            })
    }
})

export const bookingsData = (state: RootState) => state.bookings.data
export const bookingByIdData = (state: RootState) => state.bookings.dataById
export const bookingsStatus = (state: RootState) => state.bookings.status
export const bookingsError = (state: RootState) => state.bookings.error
export default bookingsSlice.reducer;