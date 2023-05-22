import { BASE_URL, checkResponse } from '../../utils/consts';
import { setCookie } from '../../utils/cookies';
import { ISAUTH_CHECKED } from './user-actions';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (accessToken, refreshToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  };
};
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      });

      const data = await checkResponse(response);
      if (data.success) {
        const { accessToken, refreshToken } = data;
        setCookie('accessToken', accessToken, 1200); // Установка времени жизни accessToken на 1200 мс
        setCookie('refreshToken', refreshToken);
        dispatch(loginSuccess(accessToken, refreshToken));
        dispatch({ type: 'ISAUTH_CHECKED', payload: true }); // Обновляем статус isAuthChecked после успешного входа
      } else {
        dispatch(loginFailed('No such user found! Please check your details!'));
      }
    } catch (err) {
      dispatch(loginFailed(err));
    }
  };
}