import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchIngredients } from "../thunks/ingredients-thunks";
import { IngredientState, IngredientPayload } from "../../utils/essentials";



const initialState : IngredientState = {
  ingredients: [],
  loadingIngredients: false,
  errorIngredients: false,
  dataRequest: false,
};

const ingredientsSlice = createSlice({
  name: "ingredients", 
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loadingIngredients = true;
        state.errorIngredients = false;
        state.dataRequest = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<IngredientPayload>) => {
        if (action.payload) {
          state.ingredients = action.payload;
          state.loadingIngredients = false;
          state.errorIngredients = false;
          state.dataRequest = true;
        }
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loadingIngredients = false;
        state.errorIngredients = true;
        console.log(action.payload); 
      });
  },
});

export const ingredientsReducer = ingredientsSlice.reducer;