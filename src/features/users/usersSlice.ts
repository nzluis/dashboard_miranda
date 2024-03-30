import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createUser, deleteUserById, fetchUserById, fetchUsers, updateUser } from "./usersThunk";
import { UserData, UserState } from "../../interfaces/Users";
import { RootState } from "../../app/store";

export const usersSlice = createSlice({
    name: 'users',
    initialState: { data: [], dataById: {} as UserData, status: 'idle', error: null } as UserState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            .addMatcher(isAnyOf(
                fetchUsers.pending,
                fetchUserById.pending,
                createUser.pending,
                updateUser.pending,
                deleteUserById.pending
            ), (state) => {
                state.status = 'pending'
            })
            .addMatcher(isAnyOf(
                fetchUsers.rejected,
                fetchUserById.rejected,
                createUser.rejected,
                updateUser.rejected,
                deleteUserById.rejected
            ), (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message || null
            })
    }
})

export const usersData = (state: RootState) => state.users.data
export const userByIdData = (state: RootState) => state.users.dataById
export const usersStatus = (state: RootState) => state.users.status
export const usersError = (state: RootState) => state.users.error
export default usersSlice.reducer;