import uniqid from 'uniqid';

export const BURGER_INGREDIENT_ITEM_ADD = 'BURGER_INGREDIENT_ITEM_ADD';
export const BURGER_INGREDIENT_ITEM_ADD_BUN = 'BURGER_INGREDIENT_ITEM_ADD_BUN';
export const BURGER_INGREDIENT_ITEM_MOVE = 'BURGER_INGREDIENT_ITEM_MOVE';
export const BURGER_INGREDIENT_ITEM_DELETE = 'BURGER_INGREDIENT_ITEM_DELETE';

export const addIngridientItem = (ingridient) => {
  const key = uniqid();
  return {
    type: BURGER_INGREDIENT_ITEM_ADD,
    ingridient: {
      ...ingridient,
      key
    },
  };
}

export const addBunItem = (bunItem) => {
  const key = uniqid();
  return {
    type: BURGER_INGREDIENT_ITEM_ADD_BUN,
    ingredient: {
      ...bunItem,
      type: 'bun',
      key
    },
  };
}

export const moveIngredientInContainer = (dragElIndex, hoverElIndex) => {
  return {
    type: BURGER_INGREDIENT_ITEM_MOVE,
    data: { dragElIndex, hoverElIndex }
  };
};

export const deleteIngredientFromConstructor = (ingridient, index) => {
  return {
    type: BURGER_INGREDIENT_ITEM_DELETE,
    index,
    ingridient,
  }
}
