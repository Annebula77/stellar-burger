import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { ingredientReducer } from './ingredient-reducer';
import { orderReducer } from './order-reducer';
import { burgerConstructorReducer } from './burger-constructor-reducer';


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientReducer,
  order: orderReducer,
  burgerOrderList: burgerConstructorReducer
})