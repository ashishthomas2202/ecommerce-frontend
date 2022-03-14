function setItem(key, value) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
    return true;
  }
  return false;
}

function getItem(key) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

const LocalStorage = { setItem, getItem };

export default LocalStorage;
