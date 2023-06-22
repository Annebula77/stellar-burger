import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../thunks/register-thunk';


const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState: {
    name: null,
    email: null,
    password: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        if (action.payload && action.payload.name && action.payload.email) {
          state.name = action.payload.name;
          state.email = action.payload.email;
          state.password = action.payload.password;
          state.isAuthenticated = true;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default registerUserSlice.reducer;