import { BASE_URL, checkResponse } from '../../utils/consts';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailed = (err) => ({
  type: LOGIN_FAILED,
  payload: err,
});

export function loginApi(email, password) {

  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });

      const data = await checkResponse(response);

      if (data.success) {
        dispatch(loginSuccess(data.token, data.refreshToken));
      } else {
        dispatch(loginFailed('No such user found! Please check your details!'));
      }
    } catch (err) {
      dispatch(loginFailed(err));
    }
  };
}
