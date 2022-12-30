function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function setCookie(name, value, expires) {
    let expiresValue = '';
    if (expires) {
      const date = new Date();
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
      expiresValue = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expiresValue}; path=/`;
  }

export default getCookie;
