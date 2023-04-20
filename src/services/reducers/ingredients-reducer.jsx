import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
} from "../actions/ingredients-actions";

const initialState = {
  ingredients: [],
  loadingIngredients: false,
  dataRequest: false,
  errorIngredients: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST:
      return {
        ...state,
        loadingIngredients: true,
        errorIngredients: false,
        dataRequest: false,
      };
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        loadingIngredients: false,
        errorIngredients: false,
        dataRequest: true,
      };
    case FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        loadingIngredients: false,
        errorIngredients: true,
      };
    default:
      return state;
  }
};
