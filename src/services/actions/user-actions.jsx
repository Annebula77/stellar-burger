import { BASE_URL, checkResponse } from '../../utils/consts';
import { getCookie, setCookie, clearCookie } from '../../utils/cookies';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const ISAUTH_CHECKED = 'ISAUTH_CHECKED';
export const ISAUTH_CHECKED_FAILD = 'ISAUTH_CHECKED_FAILD';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailed = (errMessage) => ({
  type: GET_USER_FAILED,
  payload: errMessage,
});

export const isAuthChecked = (isAuthenticated) => ({
  type: ISAUTH_CHECKED,
  payload: isAuthenticated,
});

export const isAuthFailed = (err) => ({
  type: ISAUTH_CHECKED_FAILD,
  payload: err,
});


export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailed = (errMessage) => ({
  type: UPDATE_USER_FAILED,
  payload: errMessage,
});

export const refreshTokenRequest = () => ({
  type: REFRESH_TOKEN_REQUEST,
});

export const refreshTokenSuccess = (data) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: data,
});

export const refreshTokenFailed = (errMessage) => ({
  type: REFRESH_TOKEN_FAILED,
  payload: errMessage,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailed = (err) => ({
  type: LOGOUT_FAILED,
  payload: err,
});


async function authRequestToServer(dispatch, method, url, actionCreators, body = null) {
  const { request, success, failure } = actionCreators;

  dispatch(startLoading()); // Начать загрузку
  dispatch(request());
  const accessToken = getCookie('accessToken');
  if (!accessToken) {
    throw new Error('Access token not found');
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${accessToken}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await checkResponse(response);

    dispatch(success(data.user));
    dispatch(endLoading());
  } catch (err) {
    if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
      dispatch(refreshTokenDelayed(getCookie('refreshToken')));
    }
    console.log(err);
    dispatch(failure(err.message)); // передаем текст сообщения об ошибке
    dispatch(endLoading());
  }
}
export function getUserDetails() {
  return (dispatch) => {
    return authRequestToServer(dispatch, 'GET', `${BASE_URL}/auth/user`, {
      request: getUserRequest,
      success: getUserSuccess,
      failure: getUserFailed,
    });
  };
}
export function updateUserDetails(name, email, password) {
  return async (dispatch) => {
    try {
      await authRequestToServer(
        dispatch,
        'PATCH',
        `${BASE_URL}/auth/user`,
        {
          request: updateUserRequest,
          success: updateUserSuccess,
          failure: updateUserFailed,
        },
        {
          name,
          email,
          password,
        }
      );

      dispatch(getUserDetails());
    } catch (err) {
      console.log(err.message)
    }
  };
}


export const logoutApi = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutRequest());

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
        dispatch(logoutSuccess());
        clearCookie('refreshToken');

        dispatch(refreshTokenSuccess({
          refreshToken: null,
          accessToken: null,
        }));

        setCookie('refreshToken', null);
        setCookie('accessToken', null);
      } else {
        throw new Error('Failed to logout');
      }
    } catch (err) {
      dispatch(logoutFailed(err));
    }
  };
};
export function refreshTokenDelayed() {
  return async (dispatch) => {
    const refreshToken = getCookie('refreshToken');
    if (!refreshToken) {
      // Если refreshToken отсутствует или недействителен, вы можете обработать это здесь
      return Promise.reject(new Error('Refresh token is invalid'));
    }
    try {
      dispatch(refreshTokenRequest());

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('refreshToken'),
        },
      };

      const response = await fetch(`${BASE_URL}/auth/token`, requestOptions);
      const data = await checkResponse(response);
      console.log(data)

      if (data.success) {
        const { accessToken, refreshToken } = data;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch(refreshTokenSuccess());
      } else {
        dispatch(refreshTokenFailed('Failed to refresh token.'));
      }
    } catch (err) {
      dispatch(refreshTokenFailed(err.message));
    }
  };
}

export const checkUserAuth = () => {
  return function (dispatch) {
    if (getCookie('accessToken')) {
      dispatch(isAuthChecked(true));
    } else {
      dispatch(isAuthChecked(false));
    }
  };
};
