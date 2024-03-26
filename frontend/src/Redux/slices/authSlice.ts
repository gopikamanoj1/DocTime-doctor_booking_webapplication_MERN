// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state,action)=>{
      console.log('hihih',action.payload);
      
      state.user = action.payload;
      state.isAuthenticated = true;
      // Store doctor info in local storage
      localStorage.setItem('User', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      
      // Remove doctor info from local storage
      localStorage.removeItem('User');
      localStorage.removeItem('isAuthenticated');
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state: any) => state.persisted.auth.user;
export const UserIsAuthenticated = (state:any) => state.persisted.auth.isAuthenticated;




export default authSlice.reducer;
