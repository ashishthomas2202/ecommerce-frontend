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

function removeItem(key) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
    return true;
  }
  return false;
}

const LocalStorage = { setItem, getItem, removeItem };

export default LocalStorage;
