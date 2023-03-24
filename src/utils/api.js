const SERVER_URL = 'https://norma.nomoreparties.space/api/ingredients';

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export  const getIngredientsData = async () => {
  try {
    const res = await fetch(SERVER_URL);
    const data = await checkResponse(res);
    return data.data;
  } catch (e) {
    throw new Error('Failed to fetch ingredients data');
  }
};