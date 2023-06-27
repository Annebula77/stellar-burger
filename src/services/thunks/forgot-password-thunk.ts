import { BASE_URL, checkResponse, PasswordResetResponse} from '../../utils/essentials';
import { createAsyncThunk } from "@reduxjs/toolkit";


export const forgotPasswordApi = createAsyncThunk<PasswordResetResponse, string, { rejectValue: string }>(
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

      const data = await checkResponse<PasswordResetResponse>(response);

      if (data.success) {
        return data;
      } else {
        return rejectWithValue('Something went wrong... try again, or contact us');
      }
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);