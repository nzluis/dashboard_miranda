import bookings from '../../assets/data/bookings.json'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingData } from '../../interfaces/Bookings';

const delay = (data: any, time = 200) => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}

let fetchedData: BookingData[]
function getData(json: BookingData[]): BookingData[] | false {
    if (!fetchedData) {
        fetchedData = json
        return fetchedData
    }
    return false
}

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    return await delay(getData(bookings))
})

export const fetchBookingById = createAsyncThunk('bookings/fetchBookingById', async (id) => {
    return await delay(id)
})

export const createBooking = createAsyncThunk('bookings/createBooking', async (newBooking: BookingData) => {
    return await delay({ ...newBooking })
})

export const updateBooking = createAsyncThunk('bookings/updateBooking', async (updatedBooking: BookingData) => {
    return await delay({ ...updatedBooking })
})

export const deleteBookingById = createAsyncThunk('bookings/deleteBookingById', async (id) => {
    return await delay(id)
})