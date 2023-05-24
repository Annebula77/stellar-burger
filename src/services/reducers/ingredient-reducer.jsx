import {
  SET_INGREDIENT_MODAL,
  CLEAR_INGREDIENT_MODAL
} from '../actions/ingredient-action';

const initialState = {
  currentIngredient: null,
}
export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_MODAL: {
      return {
        ...state,
        currentIngredient: { ...state.currentIngredient, ...action.data }
      };
    }
    case CLEAR_INGREDIENT_MODAL: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};