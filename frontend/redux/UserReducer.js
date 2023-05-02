import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import AxiosConfig from '../Helpers/AxiosConfig'

export const AddUser = createAsyncThunk('user/AddUser', async({newUserData}) => {
    try {
        console.log(newUserData)
        const response = await AxiosConfig.post('/users/AddUser', newUserData)
        return response.data
    } catch (err) {
        console.error(`Error in AddUser Reducer ${err}`)
    }
})

export const LoginUser = createAsyncThunk('user/LoginUser', async({userCreds}) => {
    try {
        const response = await AxiosConfig.post('/users/Signin', userCreds)
        return response.data
    } catch (err) {
        console.error(`Error in LoginUser Reducer ${err}`)
    }
})

const UserReducer = createSlice({
    name: 'UserHandler', 
    initialState: {
        userData: [],
        jwtToken: null,
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddUser.fulfilled, (state) => {
                state.status = 'accepted'
            })
            .addCase(AddUser.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(AddUser.rejected, (state) => {
                state.status = 'rejected'
            })
            .addCase(LoginUser.fulfilled, (state, action) => {
                state.userData = action.payload.user
                state.jwtToken = action.payload.token
                state.status = 'accepted'
            })
            .addCase(LoginUser.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(LoginUser.rejected, (state) => {
                state.status = 'rejected'
            })
    }
})

export default UserReducer.reducer