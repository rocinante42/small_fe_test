import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from './api-slice';
interface AuthState {
  accessToken: string | null;
  clientToken: string | null;
  user: any | null;
  view: any | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  clientToken: localStorage.getItem('clientToken'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  view: JSON.parse(localStorage.getItem('view') || 'null'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; clientToken: string; user: any; view: any }>) => {
      state.accessToken = action.payload.accessToken;
      state.clientToken = action.payload.clientToken;
      state.user = action.payload.user;
      state.view = action.payload.view;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('clientToken', action.payload.clientToken);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('view', JSON.stringify(action.payload.view));
    },
    logout: (state) => {
      state.accessToken = null;
      state.clientToken = null;
      state.user = null;
      state.view = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('clientToken');
      localStorage.removeItem('user');
      localStorage.removeItem('view');
      api.util.invalidateTags(['UserProfile']);
      api.util.invalidateTags(['StoreInfo']);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;