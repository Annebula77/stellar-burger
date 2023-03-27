const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

function request(endpoint, options) {
  return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse);
}

export const getIngredientsData = async () => {
  try {
    const data = await request('ingredients');
    return data.data;
  } catch (e) {
    throw new Error('Failed to fetch ingredients data');
  }
};

export const postData = async (data) => {
  return await request('orders', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      ingredients: data
    })
  });
}