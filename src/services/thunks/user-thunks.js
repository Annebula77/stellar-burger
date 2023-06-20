import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, checkResponse } from '../../utils/consts';
import { getCookie, setCookie, clearCookie } from '../../utils/cookies';
import { 
  logoutSuccess,
  logoutFailed,
  isAuthChecked,
} from '../slices/user-slice';

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
      };
      const response = await fetch(`${BASE_URL}/auth/user`, options);
      const data = await checkResponse(response);
      return data.user; // Return the user object as the fulfilled value
    } catch (err) {
      if (err.message === 'jwt expired') {
        // Обработка ошибки и вызов refreshTokenApi
        return dispatch(refreshTokenApi())
          .then(() => dispatch(getUserDetails()))
          .catch((refreshError) => {
            console.log(refreshError);
            // Возвращение значения в случае ошибки обновления токена и получения деталей пользователя
            return rejectWithValue(refreshError);
          });
      } else {
        // Обработка других ошибок
        return rejectWithValue(err);
      }
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async ({ name, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }
      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ name, email, password }),
      };

      const response = await fetch(`${BASE_URL}/auth/user`, options);
      await checkResponse(response);
      dispatch(getUserDetails());
    } catch (err) {
      if (err.message === 'jwt expired') {
        // Обработка ошибки и вызов refreshTokenApi
        return dispatch(refreshTokenApi())
          .then(() => dispatch(getUserDetails()))
          .catch((refreshError) => {
            console.log(refreshError);
            // Возвращение значения в случае ошибки обновления токена и получения деталей пользователя
            return rejectWithValue(refreshError);
          });
      } else {
        // Обработка других ошибок
        return rejectWithValue(err);
      }
    }
  }
);

export const logoutApi = createAsyncThunk(
  'user/logoutApi',
  async (_, { dispatch }) => {
    try {
      const refreshToken = getCookie('refreshToken');
      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }

      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      });
      const data = await checkResponse(response);

      if (data.success) {
        clearCookie('refreshToken');
        clearCookie('accessToken');
        dispatch(logoutSuccess());
      } else {
        throw new Error('Failed to logout');
      }
    } catch (err) {
      dispatch(logoutFailed(err));
    }
  }
);

export const refreshTokenApi = createAsyncThunk(
  'user/refreshTokenApi',
  async () => {
    const refreshToken = getCookie('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token is invalid');
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + refreshToken,
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    };

    const response = await fetch(`${BASE_URL}/auth/token`, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to refresh token.');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error('Failed to refresh token.');
    }

    const { accessToken, refreshToken: newRefreshToken } = data;
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken };
  }
);

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', (_, { dispatch }) => {
  if (getCookie('accessToken')) {
    dispatch(isAuthChecked(true));
  } else {
    dispatch(isAuthChecked(false));
  }
});