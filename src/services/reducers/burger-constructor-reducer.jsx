import {
  BURGER_INGREDIENT_ITEM_ADD,
  BURGER_INGREDIENT_ITEM_ADD_BUN,
  BURGER_INGREDIENT_ITEM_MOVE,
  BURGER_INGREDIENT_ITEM_DELETE
} from '../actions/burger-constructor-action'


const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_INGREDIENT_ITEM_ADD:
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingridient],
      };
    case BURGER_INGREDIENT_ITEM_ADD_BUN:
      return {
        ...state,
        bun: action.bun,
      };


    case BURGER_INGREDIENT_ITEM_MOVE:
      const dragConstructor = [...state.ingredients];
      dragConstructor.splice(
        action.data.dragElIndex,
        0,
        dragConstructor.splice(action.data.hoverElIndex, 1)[0]
      );

      return {
        ...state,
        ingredients: dragConstructor
      };

    case BURGER_INGREDIENT_ITEM_DELETE:
      const orderList = [...state.ingredients];
      orderList.splice(action.index, 1);
      return {
        ...state,
        ingredients: orderList
      };

    default:
      return state;
  };
}