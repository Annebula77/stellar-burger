import { BASE_URL, checkResponse } from '../../utils/api-consts';

export const FETCH_INGREDIENTS_REQUEST = "FETCH_INGREDIENTS_REQUEST";
export const FETCH_INGREDIENTS_SUCCESS = "FETCH_INGREDIENTS_SUCCESS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";



export const fetchIngredientsRequest = () => ({
  type: FETCH_INGREDIENTS_REQUEST,
});

export const fetchIngredientsSuccess = (data) => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  payload: data,
});

export const fetchIngredientsFailed = () => ({
  type: FETCH_INGREDIENTS_FAILED,
});


export const fetchIngredients = () => {
  return async (dispatch) => {
    dispatch(fetchIngredientsRequest());
    try {
      const res = await fetch(`${BASE_URL}/ingredients`);
      const data = await checkResponse(res);
      dispatch(fetchIngredientsSuccess(data.data));
    } catch (error) {
      dispatch(fetchIngredientsFailed());
    }
  };
};

