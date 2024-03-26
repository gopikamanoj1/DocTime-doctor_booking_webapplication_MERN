// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  admin: {
    id: string;
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  admin: null,
  isAuthenticated: false,
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setAdmin: (state,action)=>{
      console.log('hihih',action.payload);
      
      state.admin = action.payload;
      state.isAuthenticated = true;
      
      // Store doctor info in local storage
      localStorage.setItem('Admin', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    clearAdmin: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      
      // Remove doctor info from local storage
      localStorage.removeItem('Admin');
      localStorage.removeItem('isAuthenticated');
    },
  },
});

export const { setAdmin, clearAdmin } = adminAuthSlice.actions;
export const selectAdmin = (state: any) => state.persisted.adminAuth.admin;
export const AdminIsAuthenticated = (state:any) => state.persisted.adminAuth.isAuthenticated;




export default adminAuthSlice.reducer;
