import { BASE_URL, checkResponse } from '../../utils/consts';
import { createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронный thunk
export const forgotPasswordApi = createAsyncThunk(
  'forgotPasswordApi',
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await checkResponse(response);

      if (data.success) {
        return data;
      } else {
        return rejectWithValue('Something went wrong... try again, or contact us');
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);