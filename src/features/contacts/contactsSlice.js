import { createSlice } from "@reduxjs/toolkit";
import { deleteContactById, fetchContactById, fetchContacts, updateContact } from "./contactsThunk";

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {data: [], dataById: null, status: 'idle', error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.data = action.payload ? action.payload : state.data
                state.status = 'fulfilled'
            })
            .addCase(fetchContactById.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchContactById.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(fetchContactById.fulfilled, (state, action) => {
                state.dataById = state.data.find(contact => contact.id === action.payload)
                state.status = 'fulfilled'
            })
            .addCase(updateContact.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(updateContact.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.data = state.data.map(contact => contact.id === action.payload.id ? action.payload : contact)
                state.status = 'fulfilled'
            })
            .addCase(deleteContactById.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(deleteContactById.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message
            })
            .addCase(deleteContactById.fulfilled, (state, action) => {
                state.data = state.data.filter(contact => contact.id !== action.payload)
                state.status = 'fulfilled'
            })
    }
})

export const contactsData = state => state.contacts.data
export const contactByIdData = state => state.contacts.dataById
export const contactsStatus = state => state.contacts.status
export const contactsError = state => state.error