import users from '../../assets/data/users.json'
import { createAsyncThunk } from "@reduxjs/toolkit";

const delay = (data, time = 200) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 200)
    })
}
let firstFetch = false
export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    if (!firstFetch) {
        const data = await delay(users)
        firstFetch = true
        return data
    }
    return delay(false)
    // return await delay(users)
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