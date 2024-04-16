import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserData } from '../../interfaces/Users';
import { callApi } from '../../api/callApi';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await callApi('users')
})

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: string) => {
    return await callApi(`users/${id}`)
})

export const createUser = createAsyncThunk('users/createUser', async (newUser: UserData) => {
    return await callApi(`users/create`, 'POST', newUser)
})

export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser: UserData) => {
    return await callApi(`users/${updatedUser._id}/update`, 'PUT', updatedUser)
})

export const deleteUserById = createAsyncThunk('users/deleteUserById', async (id: string) => {
    return await callApi(`users/${id}/delete`, 'DELETE')
})