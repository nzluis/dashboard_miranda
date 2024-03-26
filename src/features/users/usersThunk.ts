import users from '../../assets/data/users.json'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserData } from '../../interfaces/Users';

const delay = (data: any, time = 200) => {
    return new Promise<any>((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, time)
    })
}
let fetchedData: UserData[]
function getData(json: UserData[]): UserData[] | false {
    if (!fetchedData) {
        fetchedData = json
        return fetchedData
    }
    return false
}
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await delay(getData(users))
})

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id) => {
    return await delay(id)
})

export const createUser = createAsyncThunk('users/createUser', async (newUser: UserData) => {
    return await delay({ ...newUser })
})

export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser: UserData) => {
    return await delay({ ...updatedUser })
})

export const deleteUserById = createAsyncThunk('users/deleteUserById', async (id) => {
    return await delay(id)
})