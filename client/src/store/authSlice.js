import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = axios.create({
    baseURL: '/api',
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const registerUser = createAsyncThunk(
 'auth/register',
 async (userData, { rejectWithValue }) => {
    try {
        const response = await API.post('/auth/register', userData)
        localStorage.setItem('token', response.data.token)
        return response.data
    } catch(error) {
        return rejectWithValue(error.response.data)
    }
 }  
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async(credentials, {rejectWithValue}) => {
        try {
            const response = await API.post('/auth/login', credentials)
            localStorage.setItem('token', response.data.token)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async(_, {rejectWithValue}) => {
        try {
            const response = await API.get('/auth/me')
            return response.data
        } catch(error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token'),
        isLoading: false,
        isError: false,
        message: ''
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('token')
        },
        clearError: (state) => {
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload ?.message || 'Registration failed'
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload?.message || 'Login failed'
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
    }
})

export const {logout, clearError} = authSlice.actions
export default authSlice.reducer