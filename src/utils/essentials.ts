import { format, isToday, isYesterday } from 'date-fns';


//Order types and interfaces
type Order = {
  number: number;
};

export interface OrderState {
  loadingOrder: boolean;
  errorOrder: null | string;
  data: null | number; 
}

export type OrderPayload = number; 

//Ingredient types interfaces

 export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: string;
}

export type IngredientListType = {
  ingredients: IIngredient[];
  }

export type IngredientState = {
  ingredients: IIngredient[],
  loadingIngredients: boolean,
  dataRequest: boolean,
  errorIngredients: boolean,
}

export type DragItem = {
  ingredient: IIngredient;
};

export type DragItemHover = {
  _id: string;
  index: number;
};

export type IngredientPayload = IIngredient[];


export type BurgerIngredientsState = {
  bun: IIngredient | null,
  ingredients: IIngredient[],  
}

export type AddIngredientPayload = IIngredient;
export type AddBunPayload = IIngredient;
export type MoveIngredientPayload = { dragElIndex: number, hoverElIndex: number };
export type DeleteIngredientPayload = number;

//user Types and Interfaces

export type RegisterState = {
  name: string,
  email: string,
  password: string,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | unknown,
}

export type UserResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  order?: Order;
  data?: IIngredient[];
  };

export type UserDataType = {
  name: string,
  email: string,
  password: string,
};

export interface UserSliceType {
  success: boolean,
  user: UserDataType | null,
  isAuthChecked: boolean,
  accessToken: string,
  refreshToken: string,
  isLoading: boolean,
  authError: ThunkError | null;
}

export type IsAuthCheckedType = UserSliceType['isAuthChecked'];
export type authErrorType = UserSliceType['authError'];
export type  userPayloadType = UserSliceType['user'];

export interface LoginArgs {
  email: string;
  password: string;
};

export interface TokenType {
  accessToken: string;
  refreshToken: string;
};

export interface LoginState {
  status: boolean;
  accessToken: string;
  refreshToken: string
}

export type LogoutType = {
  success: boolean,
  };
  
  export interface User {
    user: {
      name: string;
      email: string;
      password: string;
    }; 
  }

  export type PasswordResetResponse = {
    message: string;
    success: boolean;
  };

  export type resetPasswordData = {
    password: string,
    token: string,
    success: boolean
  }

  export type ForgotPasswordState = {
    status: boolean;
  }

  export type resetPasswordState = {
    success: boolean,
  }
  

  // error handling interfaces and types
export interface ThunkError {
  message: string;
  statusCode: number;
  errorType: string;
}

export type ThunkApiConfig = {
  rejectValue: ThunkError;
}

//Modal types and interfaces

export type ModalContent = string | number | { [key: string]: any };

export interface ModalState {
  modalType: string | null;
  modalContent: ModalContent | null;
}

// WebSocket interfaces

export interface WsOrder {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface WsDataPayload {
  success: boolean;
  orders: WsOrder[];
  total: number;
  totalToday: number;
}

export interface WsState {
  wsConnected: boolean,
  orders: WsOrder[] | null,
  total: number,
  totalToday: number,
  error: ThunkError | null,
}

//Component props








//consts

export const BASE_URL = 'https://norma.nomoreparties.space/api';


export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const TabItems = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main'
};


export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  let formattedDate: string;
  if (isToday(date)) {
    formattedDate = 'Сегодня';
  } else if (isYesterday(date)) {
    formattedDate = 'Вчера';
  } else {
    formattedDate = format(date, 'dd.MM.yyyy'); // Используйте нужный вам формат даты
  }

  const formattedTime = format(date, 'HH:mm');
  let timeZone = format(date, 'xxx');

   // Убираем двоеточие и нолики
   timeZone = timeZone.replace(/:00/g, '').replace(/\+0/g, '+');

   return `${formattedDate}, ${formattedTime} i-GMT${timeZone}`;
};