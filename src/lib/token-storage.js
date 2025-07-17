export function setToken(token) {
  localStorage.setItem('jwt_token', token);
}

export function getToken() {
  return localStorage.getItem('jwt_token');
}

export function deleteToken() {
  return localStorage.removeItem('jwt_token');
}
