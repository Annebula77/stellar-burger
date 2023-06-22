import { BASE_URL, checkResponse } from '../../utils/consts';
import { setCookie } from '../../utils/cookies';
import { getUserDetails } from './user-thunks';
import { isAuthChecked } from '../slices/user-slice';
import { createAsyncThunk } from "@reduxjs/toolkit";


interface LoginArgs {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const loginApi = createAsyncThunk<LoginResponse, LoginArgs>(
  'login/loginApi',
  async ({ email, password }, { dispatch }) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await checkResponse(response);
    if (data.success) {
      const { accessToken, refreshToken } = data;
      setCookie('accessToken', accessToken, { 'max-age': 1200 });
      setCookie('refreshToken', refreshToken);
      dispatch(isAuthChecked(true));
      dispatch(getUserDetails());
      return { accessToken, refreshToken };
    } else {
      throw new Error('No such user found! Please check your details!');
    }
  }
);
