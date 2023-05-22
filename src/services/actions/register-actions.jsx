import { BASE_URL } from '../../utils/consts';
import { setCookie } from '../../utils/cookies';
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS"; // Исправлено
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
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
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      };

      const response = await fetch(`${BASE_URL}/auth/register`, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${data.message}`);
      }

      if (data.success) {
        const { token, refreshToken, user } = data; // Извлекаем объект user из данных
        setCookie("token", token);
        setCookie("refreshToken", refreshToken);
        dispatch(registerUserSuccess(user)); // Передаем объект user в функцию registerUserSuccess
      } else {
        dispatch(registerUserFailed('Something went wrong! Try again...'));
      }
    } catch (err) {
      dispatch(registerUserFailed(err));
    }
  };
}