import { BASE_URL, checkResponse } from '../../utils/consts';

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";



export const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST,
});

export const resetPasswordSuccess = (data) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data,
});

export const resetPasswordFailed = (err) => ({
  type: RESET_PASSWORD_FAILED,
  payload: err,
});

export function resetPasswordApi(requiredData) {

  return async (dispatch) => {
    dispatch(resetPasswordRequest());

    try {
      const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requiredData }),
      });

      const data = await checkResponse(response);

      if (data.success) {
        dispatch(resetPasswordSuccess(data));
      } else {
        dispatch(resetPasswordFailed('Something went wrong... try again, or contact us'));
      }
    } catch (err) {
      dispatch(resetPasswordFailed(err));
    }
  };
}
