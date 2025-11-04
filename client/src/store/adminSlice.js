import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = axios.create({
    baseURL: '/api',
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const adminLogin = createAsyncThunk(
    'admin/login',
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await API.post('/admin/login', credentials)
            localStorage.setItem('adminToken', response.data.token)
            return response.data
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAdminProfile = createAsyncThunk(
    'admin/getProfile',
    async(__dirname, {rejectWithValue}) => {
        try {
            const response = await API.get('/admin/profile')
            return response.data
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: null,
        token: localStorage.getItem('adminToken'),
        isLoading: false,
        isError: false,
        message: '',
    },
    reducers : {
        adminLogout: (state) => {
            state.admin = null
            state.token = null
            localStorage.removeItem('adminToken')
        },
        clearAdminError: (state) => {
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.isLoading = false
                state.admin = action.payload.admin
                state.token = action.payload.token
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload.token
            })
            .addCase(getAdminProfile.fulfilled, (state,action) => {
                state.admin = action.payload.admin
            })
    }
})

export const  { adminLogout, clearAdminError } = adminSlice.actions
export default adminSlice.reducer

