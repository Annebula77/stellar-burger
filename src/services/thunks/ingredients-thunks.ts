import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse, UserResponse } from "../../utils/essentials";
import { IIngredient } from "../../utils/essentials";


export const fetchIngredients = createAsyncThunk<IIngredient[], void, { rejectValue: string }>(
  "ingredients/fetchIngredients",
  async (_, thunkAPI) => { 
    try {
      const res = await fetch(`${BASE_URL}/ingredients`);
      const data  = await checkResponse<UserResponse>(res);
      return data.data ?? []; 
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

