import contacts from '../../assets/data/contacts.json'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactData } from '../../interfaces/Contacts';

const delay = (data: any, time = 200) => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}
let fetchedData: ContactData[]
function getData(json: ContactData[]): ContactData[] | false {
    if (!fetchedData) {
        fetchedData = json
        return fetchedData
    }
    return false
}
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async () => {
    return await delay(getData(contacts))
})

export const fetchContactById = createAsyncThunk('contacts/fetchContactById', async (id) => {
    return await delay(id)
})

export const updateContact = createAsyncThunk('contacts/updateContact', async (updatedContact: ContactData) => {
    return await delay({ ...updatedContact }, 1000)
})

export const deleteContactById = createAsyncThunk('contacts/deleteContactById', async (id) => {
    return await delay(id)
})