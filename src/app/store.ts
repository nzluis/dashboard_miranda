import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "../features/bookings/bookingsSlice";
import roomsSlice from "../features/rooms/roomsSlice";
import contactsSlice from "../features/contacts/contactsSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        bookings: bookingsSlice,
        rooms: roomsSlice,
        contacts: contactsSlice,
        users: usersSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch