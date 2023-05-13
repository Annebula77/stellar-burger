import { BASE_URL, checkResponse } from '../../utils/consts';

export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_REQUEST";
export const USER_DETAILS_FAILED = "USER_DETAILS_REQUEST";



export const userDetailsRequest = () => ({
  type: USER_DETAILS_REQUEST,
});

export const userDetailsSuccess = (data) => ({
  type: USER_DETAILS_SUCCESS,
  payload: data,
});

export const userDetailsFailed = (err) => ({
  type: USER_DETAILS_FAILED,
  payload: err,
});

export function setUserDetails(requiredData) {

  return async (dispatch) => {
    dispatch(userDetailsRequest());

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requiredData }),
      });

      const data = await checkResponse(response);

      if (data.success) {
        dispatch(userDetailsSuccess(data));
      } else {
        dispatch(userDetailsFailed('Invalid User Data'));
      }
    } catch (err) {
      dispatch(userDetailsFailed(err));
    }
  };
}
