import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, checkResponse } from "../../utils/consts";

// createAsyncThunk автоматически создает три действия: pending, fulfilled и rejected.
export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients", // уникальное имя действия
  async (_, thunkAPI) => { // функция, возвращающая Promise
    try {
      const res = await fetch(`${BASE_URL}/ingredients`);
      const data = await checkResponse(res);
      return data.data; // данные, которые будут переданы в fulfilled действие
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

