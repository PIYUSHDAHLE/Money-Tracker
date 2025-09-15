import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api/mockServer'
import { User } from '../types'

type AuthState = { user: User | null; loading: boolean; error?: string }

const initialState: AuthState = { user: JSON.parse(localStorage.getItem('mt_current_user') || 'null'), loading: false }

export const registerUser = createAsyncThunk('auth/register', async ({ name, email, password }: { name: string; email: string; password: string }, thunkAPI) => {
  try {
    const u = await api.register(name, email, password)
    return u
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }, thunkAPI) => {
  try {
    const u = await api.login(email, password)
    return u
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message)
  }
})

export const forgotPasswordUser = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: { email: string }, thunkAPI) => {
    try {
      const res = await api.forgotPassword(email); // <-- implement in mockServer
      return res.message; // e.g. "Password reset link sent"
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      localStorage.removeItem("mt_current_user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user cases
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        localStorage.setItem("mt_current_user", JSON.stringify(a.payload));
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      // Login user cases
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        localStorage.setItem("mt_current_user", JSON.stringify(a.payload));
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      // Forgot password cases
      .addCase(forgotPasswordUser.pending, (s) => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(forgotPasswordUser.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(forgotPasswordUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      });
  },
});


export const { logout } = slice.actions
export default slice.reducer