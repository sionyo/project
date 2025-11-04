import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useRevalidator } from 'react-router-dom'

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

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

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

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/admin/users')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' })
    }
  }
)

export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async(userId, {rejectWithValue}) => {
        try {
            await API.delete(`/admin/users/${userId}`)
            return userId
        } catch (error) {
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
        users:null,
        userCount:0,
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
            .addCase(getUsers.pending, (state,action) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = action.payload.users
                state.userCount = action.payload.count
            })
            .addCase(getUsers.rejected, (state,action) => {
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload?.message || 'Error fetching user'
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user._id !== action.payload)
                state.userCount = state.userCount - 1
            })
    }
})

export const  { adminLogout, clearAdminError } = adminSlice.actions
export default adminSlice.reducer

