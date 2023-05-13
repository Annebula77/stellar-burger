import { BASE_URL, checkResponse } from '../../utils/consts';

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";



export const forgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: data,
});

export const forgotPasswordFailed = (err) => ({
  type: FORGOT_PASSWORD_FAILED,
  payload: err,
});

export function forgotPasswordApi(email) {

  return async (dispatch) => {
    dispatch(forgotPasswordRequest());

    try {
      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await checkResponse(response);

      if (data.success) {
        dispatch(forgotPasswordSuccess(data));
      } else {
        dispatch(forgotPasswordFailed('Something went wrong... try again, or contact us'));
      }
    } catch (err) {
      dispatch(forgotPasswordFailed(err));
    }
  };
}
