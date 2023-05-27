import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { ingredientReducer } from './ingredient-reducer';
import { orderReducer } from './order-reducer';
import { burgerConstructorReducer } from './burger-constructor-reducer';
import { forgotPasswordReducer } from './forgot-password-reducer';
import { resetPasswordReducer } from './reset-password-reducer';
import { userReducer } from './user-reducer';
import { loginReducer } from './login-reducer';
import { registerUserReducer } from './register-reducer';
import { wsReducer } from './webSocket-reducer';


export const rootReducer = combineReducers({
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  registerUser: registerUserReducer,
  user: userReducer,
  login: loginReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientReducer,
  order: orderReducer,
  burgerOrderList: burgerConstructorReducer,
  ws: wsReducer,
})