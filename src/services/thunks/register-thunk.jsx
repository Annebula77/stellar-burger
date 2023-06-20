import { BASE_URL } from '../../utils/consts';
import { setCookie } from '../../utils/cookies';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const registerUser = createAsyncThunk(
  'registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      };

      const response = await fetch(`${BASE_URL}/auth/register`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${data.message}`);
      }

      if (data.success) {
        const { accessToken, refreshToken, user } = data;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        return user;


      } else {
        return rejectWithValue('Something went wrong! Try again...');
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);