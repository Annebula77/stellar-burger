import { BASE_URL, checkResponse } from '../../utils/consts';
import { createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронный thunk
export const resetPasswordApi = createAsyncThunk(
  'resetPasswordApi',
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, token }),
      });

      const data = await checkResponse(response);

      if (data.success) {
        return data;
      } else {
        return rejectWithValue(data);
      }
    } catch (err) {
      return rejectWithValue('Something went wrong... try again, or contact us');
    }
  }
);