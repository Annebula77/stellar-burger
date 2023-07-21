import { BASE_URL, checkResponse, UserResponse } from '../../utils/essentials';
import { setCookie } from '../../utils/cookies';
import { getUserDetails } from './user-thunks';
import { isAuthChecked } from '../slices/user-slice';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginArgs, TokenType } from '../../utils/essentials';


export const loginApi = createAsyncThunk<TokenType, LoginArgs>(
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

    const data = await checkResponse<UserResponse>(response);
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
