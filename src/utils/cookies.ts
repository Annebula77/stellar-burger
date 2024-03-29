interface CookieProps {
  expires?: number | Date | string;
  path?: string;
  [propName: string]: any;
}

export function setCookie(name: string, value: string, props?: CookieProps) {
  props = {
    path: '/',
    ...props,
  };

  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date) {
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
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  const cookieValue = matches ? decodeURIComponent(matches[1]) : undefined;
  return cookieValue;
}


export function clearCookie(name: string): void {
  setCookie(name, '', {
    'max-age': -1
  })
}


