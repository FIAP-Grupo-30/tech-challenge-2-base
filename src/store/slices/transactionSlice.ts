import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { TransactionState, Transaction, TransactionFilters, CreateTransactionRequest } from '../../types';
import { apiService } from '../../services/api';
import { eventBus } from '../../services/eventBus';

const initialFilters: TransactionFilters = {
  type: 'all',
  category: 'all',
  startDate: null,
  endDate: null,
  searchTerm: '',
};

const initialState: TransactionState = {
  transactions: [],
  filteredTransactions: [],
  isLoading: false,
  error: null,
  filters: initialFilters,
  pagination: { page: 1, pageSize: 10, totalItems: 0, totalPages: 0 },
};

const filterTransactions = (transactions: Transaction[], filters: TransactionFilters): Transaction[] => {
  return transactions.filter((t) => {
    if (filters.type !== 'all' && t.type !== filters.type) return false;
    if (filters.category !== 'all' && t.category !== filters.category) return false;
    if (filters.startDate && new Date(t.date) < new Date(filters.startDate)) return false;
    if (filters.endDate && new Date(t.date) > new Date(filters.endDate)) return false;
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      const matchDesc = t.description?.toLowerCase().includes(term);
      const matchFrom = t.from?.toLowerCase().includes(term);
      const matchTo = t.to?.toLowerCase().includes(term);
      if (!matchDesc && !matchFrom && !matchTo) return false;
    }
    return true;
  });
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetch',
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getStatement(accountId);
      return response.result.transactions;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/create',
  async (data: CreateTransactionRequest, { rejectWithValue }) => {
    try {
      const response = await apiService.createTransaction(data);
      eventBus.emitTransactionCreated(response.id);
      eventBus.emitTransactionsUpdated();
      eventBus.emitRefreshDashboard();
      return response;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<TransactionFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredTransactions = filterTransactions(state.transactions, state.filters);
      state.pagination.totalItems = state.filteredTransactions.length;
      state.pagination.totalPages = Math.ceil(state.filteredTransactions.length / state.pagination.pageSize);
      state.pagination.page = 1;
    },
    clearFilters: (state) => {
      state.filters = initialFilters;
      state.filteredTransactions = state.transactions;
      state.pagination.totalItems = state.transactions.length;
      state.pagination.totalPages = Math.ceil(state.transactions.length / state.pagination.pageSize);
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
        state.filteredTransactions = filterTransactions(action.payload, state.filters);
        state.pagination.totalItems = state.filteredTransactions.length;
        state.pagination.totalPages = Math.ceil(state.filteredTransactions.length / state.pagination.pageSize);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload);
        state.filteredTransactions = filterTransactions(state.transactions, state.filters);
        state.pagination.totalItems = state.filteredTransactions.length;
        state.pagination.totalPages = Math.ceil(state.filteredTransactions.length / state.pagination.pageSize);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setFilters, clearFilters, setPage } = transactionSlice.actions;

// Seletores
export const selectTransactions = (state: { transactions: TransactionState }) => state.transactions.transactions;
export const selectFilteredTransactions = (state: { transactions: TransactionState }) => state.transactions.filteredTransactions;
export const selectTransactionFilters = (state: { transactions: TransactionState }) => state.transactions.filters;
export const selectPagination = (state: { transactions: TransactionState }) => state.transactions.pagination;

export const selectPaginatedTransactions = (state: { transactions: TransactionState }) => {
  const { filteredTransactions, pagination } = state.transactions;
  const start = (pagination.page - 1) * pagination.pageSize;
  return filteredTransactions.slice(start, start + pagination.pageSize);
};

export default transactionSlice.reducer;
