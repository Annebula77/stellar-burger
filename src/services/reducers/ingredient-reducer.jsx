import {
  SET_INGREDIENT_MODAL,
  CLEAR_INGREDIENT_MODAL
} from '../actions/ingredient-action';

const initialState = {
  сurrentIngredient: null,
}
export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_MODAL: {
      return {
        ...state,
        сurrentIngredient: { ...state.сurrentIngredient, ...action.data }
      };
    }
    case CLEAR_INGREDIENT_MODAL: {
      return {
        ...state,
        сurrentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};