function setItem(key, value) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
    return true;
  }
  return false;
}

function getItem(key) {
  if (typeof window !== 'undefined') {
    let str = localStorage.getItem(key);
    if (str && str[0] === '"' && str[str.length - 1] === '"') {
      let result = str.substring(1, str.length - 1);
      return result;
    }
    return str;
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
