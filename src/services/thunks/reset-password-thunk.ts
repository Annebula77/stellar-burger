import { BASE_URL, checkResponse, resetPasswordData } from '../../utils/essentials';
import { createAsyncThunk } from "@reduxjs/toolkit";


export const resetPasswordApi = createAsyncThunk<resetPasswordData, resetPasswordData, { rejectValue: string }>(
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

      const data = await checkResponse<resetPasswordData>(response);

      if (data.success) {
        return data;
      } else {
        return rejectWithValue('Request to reset password failed');
      }
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);