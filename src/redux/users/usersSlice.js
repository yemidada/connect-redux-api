import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const api = 'https://randomuser.me/api/?results=5'

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (thunkAPI) =>{
try {
    const response =  await axios.get(api)
    return response.data;
} catch (error) {
    thunkAPI.rejectWithValue(error.message)
}
})


export const usersSlice = createSlice({
    name:'users',
    initialState:{
        isLoading:true,
        error: undefined,
        users: []
    },
    extraReducers:(builder) => {
        builder.addCase(fetchUsers.pending, (state) =>{
            state.isLoading = true
        }).addCase(fetchUsers.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.users = action.payload.results;
        }).addCase(fetchUsers.rejected, (state, action) =>{
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export default usersSlice.reducer;