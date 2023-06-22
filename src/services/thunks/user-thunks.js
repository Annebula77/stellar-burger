import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, checkResponse } from '../../utils/consts';
import { getCookie, setCookie, clearCookie } from '../../utils/cookies';
import { 
  logoutSuccess,
  logoutFailed,
  isAuthChecked,
} from '../slices/user-slice';

const sendRequestWithRefreshToken = async (
  endpoint, 
  options, 
  dispatch, 
  rejectWithValue, 
  callbackOnSuccess
) => {
  try {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    options.headers.Authorization = accessToken;
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    
     if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message);  // Убедитесь, что сервер возвращает "message" в теле ответа
    }

    const data = await response.json();

    if(callbackOnSuccess) {
      return callbackOnSuccess(data);
    }
  } catch (err) {
    if (err.message === "jwt expired") {
      return dispatch(refreshTokenApi())
          .then(() => {
            // повторный запрос с новым токеном
            options.headers.Authorization = getCookie('accessToken');
            return fetch(`${BASE_URL}${endpoint}`, options);
          })
          .then((response) => {
            if (!response.ok) {
              const errorResponse = response.json();
              return rejectWithValue(new Error(errorResponse.message));
            }
            return response.json();
          })
          .then((data) => {
            if(callbackOnSuccess) {
              return callbackOnSuccess(data);
            }
          })
          .catch((refreshError) => {
              console.log(refreshError);
              return rejectWithValue(refreshError);
          });
    } else {
      return rejectWithValue(err.message);
    }
  }
};


export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (_, { dispatch, rejectWithValue }) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return sendRequestWithRefreshToken(
      '/auth/user',
      options,
      dispatch,
      rejectWithValue,
      (data) => {
        return data.user;
      }
    )
  });

export const updateUserDetails = createAsyncThunk(
  'user/updateUserDetails',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    };

    return sendRequestWithRefreshToken(
      '/auth/user',
      options,
      dispatch,
      rejectWithValue,
      () => dispatch(getUserDetails())
    );
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