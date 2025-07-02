import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: {
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: 'ADMIN' | 'USER';
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState['user']>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isAdmin = action.payload?.role === 'ADMIN';
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.isAdmin = false;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
