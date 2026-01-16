import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { AccountState, Account } from '../../types';
import { apiService } from '../../services/api';

const initialState: AccountState = {
  accounts: [],
  cards: [],
  selectedAccount: null,
  balance: 0,
  isLoading: false,
  error: null,
};

export const fetchAccount = createAsyncThunk(
  'account/fetchAccount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getAccount();
      const balance = response.result.transactions.reduce((acc, t) => acc + t.value, 0);
      return { ...response.result, balance };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    selectAccount: (state, action: PayloadAction<string>) => {
      const account = state.accounts.find((acc) => acc.id === action.payload);
      if (account) state.selectedAccount = account;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    clearAccount: (state) => {
      state.accounts = [];
      state.cards = [];
      state.selectedAccount = null;
      state.balance = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accounts = action.payload.account;
        state.cards = action.payload.cards;
        state.balance = action.payload.balance;
        if (action.payload.account.length > 0 && !state.selectedAccount) {
          state.selectedAccount = action.payload.account[0];
        }
      })
      .addCase(fetchAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, selectAccount, updateBalance, clearAccount } = accountSlice.actions;

// Seletores
export const selectAccountState = (state: { account: AccountState }) => state.account;
export const selectSelectedAccount = (state: { account: AccountState }) =>
  state.account.selectedAccount;
export const selectBalance = (state: { account: AccountState }) => state.account.balance;

export default accountSlice.reducer;
