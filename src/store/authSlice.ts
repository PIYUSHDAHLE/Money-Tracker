import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/mockServer";
import { User } from "../types";

type AuthState = { user: User | null; loading: boolean; error?: string };

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("mt_current_user") || "null"),
  loading: false,
};

// Register
export const registerUser = createAsyncThunk<User, { name: string; email: string; password: string }, { rejectValue: string }>(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const u = await api.register(name, email, password);
      return u as User; // ✅ ensure it matches User
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// Login
export const loginUser = createAsyncThunk<User, { email: string; password: string }, { rejectValue: string }>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const u = await api.login(email, password);
      return u as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


// Forgot Password
export const forgotPasswordUser = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }: { email: string }, thunkAPI) => {
    try {
      const res = await api.forgotPassword(email);
      return res.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Reset Password
export const resetPasswordUser = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.resetPassword(email, password);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Fetch User (by ID)
export const fetchUser = createAsyncThunk<User, string, { rejectValue: string }>(
  "auth/fetchUser",
  async (userId, thunkAPI) => {
    try {
      const u = await api.getUser(userId);
      return u as unknown as User;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);



// Update User Info (Profile settings)
export const updateUser = createAsyncThunk<User, Partial<User>, { rejectValue: string }>(
  "auth/updateUser",
  async (updatedData, thunkAPI) => {
    try {
      const u = await api.updateUser(updatedData);
      return u as unknown as User;
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
      // Register
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

      // Login
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

      // Forgot Password
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
      })

      // Reset Password
      .addCase(resetPasswordUser.pending, (s) => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(resetPasswordUser.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(resetPasswordUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // Fetch User
      .addCase(fetchUser.pending, (s) => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(fetchUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        localStorage.setItem("mt_current_user", JSON.stringify(a.payload));
      })
      .addCase(fetchUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      // Update User
      .addCase(updateUser.pending, (s) => {
        s.loading = true;
        s.error = undefined;
      })
      .addCase(updateUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload;
        localStorage.setItem("mt_current_user", JSON.stringify(a.payload));
      })
      .addCase(updateUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
