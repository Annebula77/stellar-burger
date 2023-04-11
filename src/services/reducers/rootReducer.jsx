import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { ingredientReducer } from './ingredient-reducer';
import { orderReducer } from './order-reducer'


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientReducer,
  order: orderReducer,

})