import { BASE_URL, checkResponse } from '../../utils/consts';
import { getCookie } from '../../utils/cookies';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setModalContent } from '../slices/modal-slice';

// Создаём асинхронный thunk
export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const accessTokenWithBearer = getCookie('accessToken');
      const accessToken = accessTokenWithBearer.replace('Bearer ', '');
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
      console.log('Заказ успешно отправлен. Результат:', result);
      dispatch(setModalContent({
        modalType: 'orderDetails',
        modalContent: result.order.number,
      }));
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);