import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice } from "../features/bookings/bookingsSlice";

export const store = configureStore({
    reducer: {
        bookings: bookingsSlice.reducer
    }
})