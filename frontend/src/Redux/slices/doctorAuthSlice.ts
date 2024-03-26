// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  doctor: {
    id: string;
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  doctor: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'doctorAuth',
  initialState,
  reducers: {
    setDoctor: (state,action)=>{
      console.log('hihih',action.payload);
      
      state.doctor = action.payload;
      state.isAuthenticated = true;
      // Store doctor info in local storage
      localStorage.setItem('doctor', JSON.stringify(action.payload));
      localStorage.setItem('isAuthenticated', 'true');
    },
    clearDoctor: (state) => {
      state.doctor = null;
      state.isAuthenticated = false;

      // Remove doctor info from local storage
      localStorage.removeItem('doctor');
      localStorage.removeItem('isAuthenticated');
    },
  },
});

export const { setDoctor, clearDoctor } = authSlice.actions;
export const selectDoctor = (state: any) => state.persisted.doctorAuth.doctor;
export const DoctorIsAuthenticated = (state:any) => state.persisted.doctorAuth.isAuthenticated;


export default authSlice.reducer;
