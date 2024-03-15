import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUserById, fetchUserById, fetchUsers, updateUser } from "./usersThunk";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {data: [], dataById: null, status: 'idle', error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf ( 
                fetchUsers.pending,
                fetchUserById.pending,
                createUser.pending,
                updateUser.pending
                ), (state) => {
                    state.status = 'pending'
            })
            .addMatcher(isAnyOf ( 
                fetchUsers.rejected,
                fetchUserById.rejected,
                createUser.rejected,
                updateUser.rejected
                ), (state, action) => {
                    state.status = 'rejected'
                    state.error = action.error.message
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.data = action.payload ? action.payload : state.data
                state.status = 'fulfilled'
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.dataById = state.data.find(user => user.id === action.payload)
                state.status = 'fulfilled'
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.data.push(action.payload)
                state.status = 'fulfilled'
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.data = state.data.map(user => user.id === action.payload.id ? action.payload : user)
                state.status = 'fulfilled'
            })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.data = state.data.filter(user => user.id !== action.payload)
                state.status = 'fulfilled'
            })
    }
})

export const usersData = state => state.users.data
export const userByIdData = state => state.users.dataById
export const usersStatus = state => state.users.status
export const usersError = state => state.error