// Пример функции setCookie с выводом отладочной информации
export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;

  // Вывод отладочной информации в консоль
  console.log('Cookie set:', name, value);
}

// Пример функции getCookie с выводом отладочной информации
export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  const cookieValue = matches ? decodeURIComponent(matches[1]) : undefined;

  // Вывод отладочной информации в консоль
  console.log('Cookie get:', name, cookieValue);

  return cookieValue;
}



export function clearCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}


