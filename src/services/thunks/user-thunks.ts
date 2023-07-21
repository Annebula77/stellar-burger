import { createAsyncThunk, ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { BASE_URL, checkResponse } from '../../utils/essentials';
import { getCookie, setCookie, clearCookie } from '../../utils/cookies';
import { UserDataType, LogoutType, TokenType, ThunkApiConfig, User } from '../../utils/essentials';
import {
  logoutSuccess,
  logoutFailed,
  isAuthChecked,
} from '../slices/user-slice';


const sendRequestWithRefreshToken = async<T>(
  endpoint: string,
  options: RequestInit,
  dispatch: ThunkDispatch<any, any, AnyAction>,
  callbackOnSuccess: (data: T) => T
): Promise<T> => {
  try {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    (options.headers as Record<string, string>).Authorization = accessToken;
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);
    }

    const data = await response.json();

    if (callbackOnSuccess) {
      return callbackOnSuccess(data);
    }

    throw new Error('Callback is not provided.');
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      return dispatch(refreshTokenApi())
        .then(() => {
          const accessToken = getCookie('accessToken');
          if (!accessToken) {
            throw new Error('Access token not found');
          }
          (options.headers as Record<string, string>).Authorization = accessToken;
          return fetch(`${BASE_URL}${endpoint}`, options);
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then(json => {
              throw new Error(json.message);
            });
          }

          return response.json();
        })
        .then((data) => {
          if (callbackOnSuccess) {
            return callbackOnSuccess(data);
          }
          throw new Error('Callback is not provided.');
        })
        .catch((refreshError) => {
          throw new Error(refreshError.message);
        });
    } else if (err instanceof Error) {
      throw err;
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
export const getUserDetails = createAsyncThunk<UserDataType, void, ThunkApiConfig>(
  'user/getUserDetails',
  async (_, { dispatch }) => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return sendRequestWithRefreshToken<UserDataType>(
      '/auth/user',
      options,
      dispatch,
      (data) => {
        return data;
      }
    )
  }
);


export const updateUserDetails = createAsyncThunk<UserDataType, User, ThunkApiConfig>(
  'user/updateUserDetails',
  async ({ name, email, password }, { dispatch }) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    };

    return sendRequestWithRefreshToken<UserDataType>(
      '/auth/user',
      options,
      dispatch,
      (data) => {
        dispatch(getUserDetails());
        return data;
      }
    );
  }
);



export const logoutApi = createAsyncThunk<void, void, ThunkApiConfig>(
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
      const data = await checkResponse<LogoutType>(response);

      if (data.success) {
        clearCookie('refreshToken');
        clearCookie('accessToken');
        dispatch(logoutSuccess());
      } else {
        throw new Error('Failed to logout');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An unexpected error occurred");
      dispatch(logoutFailed({
        message: error.message,
        statusCode: 500,
        errorType: 'UnknownError'
      }))
    }
  }
);

export const refreshTokenApi = createAsyncThunk<TokenType, void, ThunkApiConfig>(
  'user/refreshTokenApi',
  async (_, { rejectWithValue, dispatch }) => {
    const refreshToken = getCookie('refreshToken');
    if (!refreshToken) {
      return rejectWithValue({
        message: 'Refresh token is invalid',
        statusCode: 401,
        errorType: 'InvalidToken'
      });
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    };

    const response = await fetch(`${BASE_URL}/auth/token`, requestOptions);
    const data = await response.json();
    if (!response.ok) {
      return rejectWithValue({
        message: data.message || 'Failed to refresh token.',
        statusCode: data.statusCode || 500,
        errorType: data.error || 'UnknownError'
      });
    }

    if (!data.success) {
      return rejectWithValue({
        message: data.message || 'Failed to refresh token.',
        statusCode: data.statusCode || 500,
        errorType: data.error || 'UnknownError'
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = data;
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken };
  }
);

export const checkUserAuth = createAsyncThunk<void, void, {}>(
  'user/checkUserAuth',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(isAuthChecked(true));
    } else {
      dispatch(isAuthChecked(false));
    }
  }
);