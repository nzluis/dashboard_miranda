import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { deleteContactById, fetchContactById, fetchContacts, updateContact } from "./contactsThunk";
import { ContactState } from "../../interfaces/Contacts";
import { RootState } from "../../app/store";

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: { data: [], dataById: undefined, status: 'idle', error: null } as ContactState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.data = action.payload ? action.payload : state.data
                state.status = 'fulfilled'
            })
            .addCase(fetchContactById.fulfilled, (state, action) => {
                state.dataById = state.data.find(contact => contact.id === action.payload)
                state.status = 'fulfilled'
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.data = state.data.map(contact => contact.id === action.payload.id ? action.payload : contact)
                state.status = 'fulfilled'
            })
            .addCase(deleteContactById.fulfilled, (state, action) => {
                state.data = state.data.filter(contact => contact.id !== action.payload)
                state.status = 'fulfilled'
            })
            .addMatcher(isAnyOf(
                fetchContacts.pending,
                fetchContactById.pending,
                updateContact.pending,
                deleteContactById.pending
            ), (state) => {
                state.status = 'pending'
            })
            .addMatcher(isAnyOf(
                fetchContacts.rejected,
                fetchContactById.rejected,
                updateContact.rejected,
                deleteContactById.rejected
            ), (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message || null
            })
    }
})

export const contactsData = (state: RootState) => state.contacts.data
export const contactByIdData = (state: RootState) => state.contacts.dataById
export const contactsStatus = (state: RootState) => state.contacts.status
export const contactsError = (state: RootState) => state.contacts.error