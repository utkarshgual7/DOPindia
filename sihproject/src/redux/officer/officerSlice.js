import { createSlice } from '@reduxjs/toolkit';

// Redux persist is used internally to remember user data; Redux alone can't do it on refresh the user data is cleared
const initialState = {
  currentOfficer: null,
  error: null,
  loading: false
}

const officerSlice = createSlice({
  name: 'officer',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentOfficer = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentOfficer = null;
      state.loading = false;
      state.error = null;
    }
  }
})

export const { signInStart, signInSuccess, signInFailure, logout } = officerSlice.actions;
export default officerSlice.reducer;