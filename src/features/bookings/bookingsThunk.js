import bookings from '../../assets/data/bookings.json'
import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 200)
    })
}

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async() => {
    return await delay(bookings)
})

export const fetchBookingById = createAsyncThunk('bookings/fetchBookingById', async(id) => {
    return await delay(bookings.find(booking => booking.id === id))
})

export const createBooking = createAsyncThunk('bookings/createBooking', async(newBooking) => {
    return await delay({id: Math.round(Math.random() * 1000), ...newBooking})
})

export const updateBooking = createAsyncThunk('bookings/updateBooking', async(updatedBooking) => {
    return await delay({...updatedBooking})
})

export const deleteBookingById = createAsyncThunk('bookings/deleteBookingById', async(id) => {
    return await delay(id)
})