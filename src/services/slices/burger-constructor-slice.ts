import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddIngredientPayload, AddBunPayload, MoveIngredientPayload, DeleteIngredientPayload, BurgerIngredientsState } from '../../utils/essentials';
import uniqid from 'uniqid';



const initialState: BurgerIngredientsState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientItem: (state, action: PayloadAction<AddIngredientPayload>) => {
      const key = uniqid();
      const ingredient = { ...action.payload, key };
      state.ingredients.push(ingredient);
    },
    addBunItem: (state, action: PayloadAction<AddBunPayload>) => {
      const key = uniqid();
      const bun = { ...action.payload, key, type: 'bun' };
      state.bun = bun;
    },
    moveIngredientInContainer: (state, action: PayloadAction<MoveIngredientPayload>) => {
      const { dragElIndex, hoverElIndex } = action.payload;
      const dragItem = state.ingredients[dragElIndex];
      state.ingredients.splice(dragElIndex, 1);
      state.ingredients.splice(hoverElIndex, 0, dragItem);
    },

    deleteIngredientFromConstructor: (state, action: PayloadAction<DeleteIngredientPayload>) => {
      state.ingredients.splice(action.payload, 1);
    },
    clearContainer: state => initialState,
  },
});

export const {
  addIngredientItem,
  addBunItem,
  moveIngredientInContainer,
  deleteIngredientFromConstructor,
  clearContainer,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;