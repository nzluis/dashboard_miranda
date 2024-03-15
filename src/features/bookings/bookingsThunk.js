import bookings from '../../assets/data/bookings.json'
import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}

let fetchedData
function getData(json) {
    if (!fetchedData) {
        fetchedData = json
        return fetchedData
    }
    return false
}

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async() => {
    return await delay(getData(bookings))
})

export const fetchBookingById = createAsyncThunk('bookings/fetchBookingById', async(id) => {
    return await delay(id)
})

export const createBooking = createAsyncThunk('bookings/createBooking', async(newBooking) => {
    return await delay({...newBooking})
})

export const updateBooking = createAsyncThunk('bookings/updateBooking', async(updatedBooking) => {
    return await delay({...updatedBooking})
})

export const deleteBookingById = createAsyncThunk('bookings/deleteBookingById', async(id) => {
    return await delay(id)
})