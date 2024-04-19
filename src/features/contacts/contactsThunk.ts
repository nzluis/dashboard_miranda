import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactData } from '../../interfaces/Contacts';
import { callApi } from '../../api/callApi';
import { DELETE, PUT } from "../../helpers/constants";

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    return await callApi('contacts')
})

export const fetchContactById = createAsyncThunk('contacts/fetchContactById', async (id: string) => {
    return await callApi(`contacts/${id}`)
})

export const updateContact = createAsyncThunk('contacts/updateContact', async (updatedContact: ContactData) => {
    return await callApi(`contacts/${updatedContact._id}/update`, PUT, updatedContact)
})

export const deleteContactById = createAsyncThunk('contacts/deleteContactById', async (id: string) => {
    return await callApi(`contacts/${id}/delete`, DELETE)
})