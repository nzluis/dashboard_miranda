import { configureStore } from "@reduxjs/toolkit";
import { bookingsSlice } from "../features/bookings/bookingsSlice";
import { roomsSlice } from "../features/rooms/roomsSlice";
import { contactsSlice } from "../features/contacts/contactsSlice";
import { usersSlice } from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        bookings: bookingsSlice.reducer,
        rooms: roomsSlice.reducer,
        contacts: contactsSlice.reducer,
        users: usersSlice.reducer
    }
})