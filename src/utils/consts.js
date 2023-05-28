import { format, isToday, isYesterday } from 'date-fns';

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const TabItems = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main'
};


export const formatDate = (isoString) => {
  const date = new Date(isoString);

  let formattedDate;
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