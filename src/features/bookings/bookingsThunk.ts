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
    const response = await fetch('http://localhost:3000/bookings/', {
        method: 'GET',
        headers: {
            "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IklsYTgyQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkVDFTb0g2L3EwVEtmT3lycDFWRGozZWJidTVjbFBDdnliNFVaSEI4eFBnb2tMbTBUeTAvRnEiLCJpYXQiOjE3MTI4MzQ4MDh9.TET-w7rD4_cEWmUvoUBUlFRBjnORpyuBIpE1ic4NFW0'
        }
    })
    const bookings = response.json()
    if (!response.ok) throw new Error('broken in fetchBookings')
    return bookings
})

export const fetchBookingById = createAsyncThunk('bookings/fetchBookingById', async (id: string) => {
    const response = await fetch(`http://localhost:3000/bookings/${id}`, {
        method: 'GET',
        headers: {
            "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IklsYTgyQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkVDFTb0g2L3EwVEtmT3lycDFWRGozZWJidTVjbFBDdnliNFVaSEI4eFBnb2tMbTBUeTAvRnEiLCJpYXQiOjE3MTI4MzQ4MDh9.TET-w7rD4_cEWmUvoUBUlFRBjnORpyuBIpE1ic4NFW0'
        }
    })
    const booking = response.json()
    if (!response.ok) throw new Error('broken in fetchBooking')
    return booking
})

export const createBooking = createAsyncThunk('bookings/createBooking', async (newBooking: BookingData) => {
    console.log(newBooking)
    const response = await fetch(`http://localhost:3000/bookings/create`, {
        method: 'POST',
        body: JSON.stringify(newBooking),
        headers: {
            "Content-type": "application/json",
            "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IklsYTgyQGhvdG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkVDFTb0g2L3EwVEtmT3lycDFWRGozZWJidTVjbFBDdnliNFVaSEI4eFBnb2tMbTBUeTAvRnEiLCJpYXQiOjE3MTI4MzQ4MDh9.TET-w7rD4_cEWmUvoUBUlFRBjnORpyuBIpE1ic4NFW0'
        }
    })
    const booking = response.json()
    if (!response.ok) throw new Error('broken in create booking')
    return booking
})

export const updateBooking = createAsyncThunk('bookings/updateBooking', async (updatedBooking: BookingData) => {
    return await delay({ ...updatedBooking })
})

export const deleteBookingById = createAsyncThunk('bookings/deleteBookingById', async (id: string) => {
    return await delay(id)
})