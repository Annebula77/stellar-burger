export const SET_INGREDIENT_MODAL = 'SET_INGREDIENT_MODAL';
export const CLEAR_INGREDIENT_MODAL = 'CLEAR_INGREDIENT_MODAL';

export const setIngredientDetails = (ingredient) => {
  return {
    type: SET_INGREDIENT_MODAL,
    data: ingredient,
  };
}

export const clearIngredientDetails = () => {
  return {
    type: CLEAR_INGREDIENT_MODAL,
  };
}