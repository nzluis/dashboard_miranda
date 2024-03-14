import contacts from '../../assets/data/contacts.json'
import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}
let firstFetch = false
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async() => {
    if (!firstFetch) {
        const data = await delay(contacts)
        firstFetch = true
        return data
    }
    return delay(false)
    // return await delay(contacts)
})

export const fetchContactById = createAsyncThunk('contacts/fetchContactById', async(id) => {
    return await delay(id)
})

export const updateContact = createAsyncThunk('contacts/updateContact', async(updatedContact) => {
    return await delay({...updatedContact}, 1000)
})

export const deleteContactById = createAsyncThunk('contacts/deleteContactById', async(id) => {
    return await delay(id)
})