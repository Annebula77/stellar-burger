import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { ingredientReducer } from './ingredient-reducer';
import { orderReducer } from './order-reducer';
import { burgerConstructorReducer } from './burger-constructor-reducer';
import { forgotPasswordReducer } from './forgot-password-reducer';
import { resetPasswordReducer } from './reset-password-reducer';
import { setUserReducer } from './user-reducer';


export const rootReducer = combineReducers({
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  setUser: setUserReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientReducer,
  order: orderReducer,
  burgerOrderList: burgerConstructorReducer,
})