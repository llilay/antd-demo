import Cookie from 'js-cookie';

// 获取Cookie
export function getCookie(key) {
  return Cookie.get(key) ? Cookie.get(key) : '';
}

// 设置Cookie
export function setCookie(key, val, expires = 7) {
  Cookie.set(key, val, { expires: expires });
}

// 清除cookie
export function removeCookie(key) {
  Cookie.remove(key);
}
