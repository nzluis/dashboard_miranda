import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice } from "../features/bookings/bookingsSlice";
import { roomsSlice } from "../features/rooms/roomsSlice";

export const store = configureStore({
    reducer: {
        bookings: bookingsSlice.reducer,
        rooms: roomsSlice.reducer
    }
})