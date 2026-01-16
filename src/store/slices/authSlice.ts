import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type {
	AuthState,
	User,
	AuthRequest,
	CreateUserRequest,
} from "../../types";
import { apiService } from "../../services/api";
import { eventBus } from "../../services/eventBus";

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};

export const login = createAsyncThunk(
	"auth/login",
	async (credentials: AuthRequest, { rejectWithValue }) => {
		try {
			const response = await apiService.authenticate(credentials);
			const user = apiService.decodeToken(response.result.token);
			eventBus.emitAuthChange(true);
			return { user, token: response.result.token };
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

export const register = createAsyncThunk(
	"auth/register",
	async (userData: CreateUserRequest, { rejectWithValue }) => {
		try {
			const response = await apiService.createUser(userData);
			return response.result;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

export const logout = createAsyncThunk("auth/logout", async () => {
	apiService.logout();
	eventBus.emitAuthChange(false);
	return null;
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
	if (!apiService.isTokenValid()) {
		apiService.logout();
		return null;
	}
	const token = apiService.getToken();
	if (!token) return null;
	const user = apiService.decodeToken(token);
	return user ? { user, token } : null;
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.isAuthenticated = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.token = null;
				state.isAuthenticated = false;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				if (action.payload) {
					state.user = action.payload.user;
					state.token = action.payload.token;
					state.isAuthenticated = true;
				} else {
					state.user = null;
					state.token = null;
					state.isAuthenticated = false;
				}
			});
	},
});

export const { clearError, setUser } = authSlice.actions;

// Seletores
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
	state.auth.isAuthenticated;

export default authSlice.reducer;
