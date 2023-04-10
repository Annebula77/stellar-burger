export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED';

const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

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

export function fetchIngredients() {
  return function (dispatch) {
    dispatch(fetchIngredientsRequest());
    fetch(`${BASE_URL}/ingredients`)
      .then(checkResponse)
      .then(data => {
        dispatch(fetchIngredientsSuccess(data));
        console.log('Данные ингредиентов получены:', data);
      })
      .catch(error => {
        console.log(error);
        dispatch(fetchIngredientsFailed());
      });
  };
}
