import { createSlice } from '@reduxjs/toolkit';

// Redux persist is used internally to remember user data; Redux alone can't do it on refresh the user data is cleared
const initialState = {
  currentClient: null,
 
  error: null,
  loading: false
}

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentClient = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentClient = null;
      state.loading = false;
      state.error = null;
    }
  }
})

export const { signInStart, signInSuccess, signInFailure, logout } = clientSlice.actions;
export default clientSlice.reducer;