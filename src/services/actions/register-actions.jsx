import { BASE_URL, checkResponse } from '../../utils/consts';
import { setCookie, getCookie } from '../../utils/cookies';
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS"; // Исправлено
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (data) => ({
  type: REGISTER_USER_SUCCESS,
  payload: data,
});

export const registerUserFailed = (err) => ({
  type: REGISTER_USER_FAILED,
  payload: err,
});

export function registerUser(name, email, password) {
  return async (dispatch) => {
    dispatch(registerUserRequest(name, email, password));

    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("accessToken"),
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      };

      const response = await fetch(`${BASE_URL}/auth/register`, requestOptions);
      const data = await checkResponse(response);

      if (data.success) {
        const { accessToken, refreshToken } = await response.json();
        setCookie("token", accessToken);
        setCookie("refreshToken", refreshToken);
        dispatch(registerUserSuccess(data.user));
      } else {
        dispatch(registerUserFailed('Something went wrong! Try again...'));
      }
    } catch (err) {
      dispatch(registerUserFailed(err));
    }
  };
}