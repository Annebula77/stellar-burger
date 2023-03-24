const SERVER_URL = 'https://norma.nomoreparties.space/api/ingredients';
const POST_ORDER = 'https://norma.nomoreparties.space/api/orders';

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

export const postData = async (data) => {  // отправка запроса POST
  return await fetch(POST_ORDER, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      ingredients: data
    })
  })
  .then((res) => checkResponse(res));
}