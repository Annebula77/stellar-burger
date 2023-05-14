import { BASE_URL, checkResponse } from '../../utils/consts';
import { getCookie } from '../../utils/cookies';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

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

export function logoutApi() {
  const refreshToken = getCookie("refreshToken");
  return async (dispatch) => {
    dispatch(logoutRequest());
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      })
      const data = await checkResponse(response);

      if (data.success) {
        dispatch(logoutSuccess());
      } else {
        dispatch(logoutFailed('Something went wrong... try again, or contact us'));
      }
    } catch (err) {
      dispatch(logoutFailed(err));
    }
  };
}



