import users from '../../assets/data/users.json'
import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}
let fetchedData
function getData(json) {
    if (!fetchedData) {
        fetchedData = json
        return fetchedData
    }
    return false
}
export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    return await delay(getData(users))
})

export const fetchUserById = createAsyncThunk('users/fetchUserById', async(id) => {
    return await delay(id)
})

export const createUser = createAsyncThunk('users/createUser', async(newUser) => {
    return await delay({...newUser})
})

export const updateUser = createAsyncThunk('users/updateUser', async(updatedUser) => {
    return await delay({...updatedUser})
})

export const deleteUserById = createAsyncThunk('users/deleteUserById', async(id) => {
    return await delay(id)
})