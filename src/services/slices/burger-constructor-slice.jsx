import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const initialState = {
  bun: null,
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientItem: (state, action) => {
      const key = uniqid();
      const ingredient = { ...action.payload, key };
      state.ingredients.push(ingredient);
    },
    addBunItem: (state, action) => {
      const bun = { ...action.payload, type: 'bun' };
      state.bun = bun;
    },
    moveIngredientInContainer: (state, action) => {
      const { dragElIndex, hoverElIndex } = action.payload;
      const dragConstructor = [...state.ingredients];
      dragConstructor.splice(
        dragElIndex,
        0,
        dragConstructor.splice(hoverElIndex, 1)[0]
      );
      state.ingredients = dragConstructor;
    },
    deleteIngredientFromConstructor: (state, action) => {
      const orderList = [...state.ingredients];
      orderList.splice(action.payload.index, 1);
      state.ingredients = orderList;
    },
    clearContainer: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
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