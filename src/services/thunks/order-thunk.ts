import { BASE_URL, checkResponse } from '../../utils/consts';
import { getCookie } from '../../utils/cookies';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setModalContent } from '../slices/modal-slice';


// Создаём асинхронный thunk
export const sendOrder = createAsyncThunk<number, string[]>(
  'order/sendOrder',
  async (data: string[], { dispatch, rejectWithValue }) => {
    try {
      const accessTokenWithBearer = getCookie('accessToken');
      const accessToken = accessTokenWithBearer?.replace('Bearer ', '');
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ingredients: data,
        }),
      });
      const result = await checkResponse(response);
      if (!result.order || !result.order.number) {
        throw new Error('Invalid response format.');
      }
      console.log('Заказ успешно отправлен. Результат:', result);
      dispatch(setModalContent({
        modalType: 'orderDetails',
        modalContent: result.order.number,
      }));
      return result.order.number;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);