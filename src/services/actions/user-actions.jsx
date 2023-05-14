import { BASE_URL, checkResponse } from '../../utils/consts';
import { getCookie, setCookie } from '../../utils/cookies';
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILED = "REFRESH_TOKEN_FAILED";

export const ISAUTH_CHECKED = "ISAUTH_CHECKED";
export const ISAUTH_CHECKED_FAILD = "ISAUTH_CHECKED_FAILD";

export const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (data) => ({
  type: GET_USER_SUCCESS,
  payload: data,
});

export const getUserFailed = (err) => ({
  type: GET_USER_FAILED,
  payload: err,
});

export const isAuthChecked = (data) => ({
  type: ISAUTH_CHECKED,
  payload: data,
});

export const isAuthFailed = (err) => ({
  type: ISAUTH_CHECKED_FAILD,
  payload: err,
});


export const updateUserRequest = () => ({
  type: UPDATE_USER_REQUEST,
});

export const updateUserSuccess = (data) => ({
  type: UPDATE_USER_SUCCESS,
  payload: data,
});

export const updateUserFailed = (err) => ({
  type: UPDATE_USER_FAILED,
  payload: err,
});

export const refreshTokenRequest = () => ({
  type: REFRESH_TOKEN_REQUEST,
});

export const refreshTokenSuccess = (data) => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: data,
});

export const refreshTokenFailed = (err) => ({
  type: REFRESH_TOKEN_FAILED,
  payload: err,
});


export function getUserDetails() {

  return async (dispatch) => {
    dispatch(getUserRequest());

    try {
      const response = await fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + getCookie("accessToken"),
        },
      });
      const data = await checkResponse(response);

      if (data.success) {
        dispatch(getUserSuccess(data.user));
      } else {
        dispatch(getUserFailed('Invalid User Data'));
      }
    } catch (err) {
      dispatch(getUserFailed(err));
    }
  };
}

export function updateUserDetails(name, email, password) {

  return async (dispatch) => {
    dispatch(updateUserRequest(name, email, password));

    try {
      const response = await fetch(`${BASE_URL}/auth/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("accessToken"),
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const data = await checkResponse(response);

      if (data.success) {
        dispatch(updateUserSuccess(data.user));
      } else {
        dispatch(updateUserFailed('Invalid User Data'));
      }
    } catch (err) {
      dispatch(updateUserFailed(err));
    }
  };
}

export function refreshToken() {
  return async (dispatch) => {
    try {
      dispatch(refreshTokenRequest());

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("refreshToken"),
        },
      };

      const response = await fetch(`${BASE_URL}/auth/token`, requestOptions);
      const data = await checkResponse(response);

      if (data.success) {
        const { accessToken, refreshToken } = await response.json();
        setCookie("token", accessToken);
        setCookie("refreshToken", refreshToken);
        dispatch(refreshTokenSuccess());
      } else {
        dispatch(refreshTokenFailed('Failed to refresh token.'));
      }
    } catch (err) {
      dispatch(refreshTokenFailed(err));
    }
  };
}

export const checkUzerAuth = () => {
  return function (dispatch) {
    if (getCookie("token")) {
      dispatch(isAuthChecked());
    } else {
      dispatch(isAuthFailed());
    }
  };
};
