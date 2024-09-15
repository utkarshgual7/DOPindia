import { createSlice } from '@reduxjs/toolkit';

// Redux persist is used internally to remember user data; Redux alone can't do it on refresh the user data is cleared
const initialState = {
  currentAgent: null,
  error: null,
  loading: false
}

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentAgent = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentAgent = null;
      state.loading = false;
      state.error = null;
    }
  }
})

export const { signInStart, signInSuccess, signInFailure, logout } = agentSlice.actions;
export default agentSlice.reducer;