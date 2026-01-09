// Authentication helper functions

function checkAuth(requiredRole) {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('authToken');

  if (!user || !token) {
    window.location.href = 'index.html';
    return;
  }

  const userData = JSON.parse(user);
  if (userData.userType !== requiredRole) {
    window.location.href = 'index.html';
  }
}

function setAuthData(user, token) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('authToken', token);
}

function getAuthToken() {
  return localStorage.getItem('authToken');
}

function isLoggedIn() {
  return localStorage.getItem('authToken') !== null;
}
