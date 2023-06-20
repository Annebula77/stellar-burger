import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../thunks/ingredients-thunks";

const initialState = {
  ingredients: [],
  loadingIngredients: false,
  dataRequest: false,
  errorIngredients: false,
};

const ingredientsSlice = createSlice({
  name: "ingredients", // уникальное имя среза
  initialState,
  reducers: {}, // пока у нас нет других действий, кроме fetchIngredients
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loadingIngredients = true;
        state.errorIngredients = false;
        state.dataRequest = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loadingIngredients = false;
        state.errorIngredients = false;
        state.dataRequest = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loadingIngredients = false;
        state.errorIngredients = true;
        console.log(action.payload); // Выведет сообщение об ошибке
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;