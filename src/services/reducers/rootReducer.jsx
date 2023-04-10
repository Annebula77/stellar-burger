import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { orderReducer } from './order-reducer';
export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,

})