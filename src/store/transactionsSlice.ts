import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api/mockServer'
import { Transaction } from '../types'
// import type { RootState } from './index'

type TXState = { items: Transaction[]; loading: boolean; error?: string }
const initialState: TXState = { items: [], loading: false }

export const fetchUserTx = createAsyncThunk('tx/fetch', async (userId: string, thunkAPI) => {
  try {
    return await api.fetchTransactionsForUser(userId)
  } catch (err: any) { return thunkAPI.rejectWithValue(err.message) }
})

export const addTx = createAsyncThunk('tx/add', async (tx: Omit<Transaction, 'id'>, thunkAPI) => {
  try { return await api.createTransaction(tx) } catch (err: any) { return thunkAPI.rejectWithValue(err.message) }
})

export const editTx = createAsyncThunk('tx/edit', async ({ id, patch }: { id: string; patch: Partial<Transaction> }, thunkAPI) => {
  try { return await api.updateTransaction(id, patch) } catch (err: any) { return thunkAPI.rejectWithValue(err.message) }
})

export const removeTx = createAsyncThunk('tx/remove', async (id: string, thunkAPI) => {
  try { await api.deleteTransaction(id); return id } catch (err: any) { return thunkAPI.rejectWithValue(err.message) }
})

const slice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    optimisticAdd(state, action) { state.items.push(action.payload) },
    optimisticUpdate(state, action) {
      const idx = state.items.findIndex(t => t.id === action.payload.id)
      if (idx >= 0) state.items[idx] = { ...state.items[idx], ...action.payload }
    },
    optimisticRemove(state, action) { state.items = state.items.filter(t => t.id !== action.payload) },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTx.pending, (s) => { s.loading = true })
      .addCase(fetchUserTx.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchUserTx.rejected, (s, a) => { s.loading = false; s.error = a.payload as string })
    //   .addCase(addTx.fulfilled, (s, a) => { /* server returned, replace if needed */ })
      .addCase(editTx.fulfilled, (s, a) => { const idx = s.items.findIndex(t => t.id === a.payload.id); if (idx >= 0) s.items[idx] = a.payload })
      .addCase(removeTx.fulfilled, (s, a) => { s.items = s.items.filter(t => t.id !== a.payload) })
  }
})

export const { optimisticAdd, optimisticRemove, optimisticUpdate } = slice.actions
export default slice.reducer