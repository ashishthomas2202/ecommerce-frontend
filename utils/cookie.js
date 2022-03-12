import TextCompression from 'lzutf8';

function set(name, value, daysToLive) {
  //   let compressor = new TextCompression.Compressor();

  let compressedValue = TextCompression.compress(value, {
    outputEncoding: 'StorageBinaryString',
  });
  //   console.log(encodeURIComponent(compressedValue));
  let cookie = `${name}=${encodeURIComponent(compressedValue)}`;

  if (typeof daysToLive === 'number') {
    cookie += '; max-age=' + daysToLive * 24 * 60 * 60;
  }

  document.cookie = cookie;
}

function get(name) {
  //   var cookieArr = document.cookie.split(';');
  //   for (var i = 0; i < cookieArr.length; i++) {
  //     var cookiePair = cookieArr[i].split('=');
  //     if (name == cookiePair[0].trim()) {
  //       return decodeURIComponent(cookiePair[1]);
  //     }
  //   }
  //   return null;

  //   let decompressor = new TextCompression.Decompressor();

  var cookieArr = document.cookie.split(';');
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split('=');
    if (name == cookiePair[0].trim()) {
      let compressedValue = decodeURIComponent(cookiePair[1]);
      //   console.log(typeof compressedValue);
      //   console.log(TextCompression.encodeStorageBinaryString(compressedValue));

      let value = TextCompression.decompress(compressedValue, {
        inputEncoding: 'StorageBinaryString',
        outputEncoding: 'String',
      });
      //   console.log(value);
      //   let value = TextCompression.decompress(compressedValue);
      //   let value = decompressor.decompressBlockToString(compressedValue);
      return value;
    }
    return null;
  }
}

function check(name) {
  var cookieArr = document.cookie.split(';');
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split('=');
    if (name == cookiePair[0].trim()) {
      return true;
    }
  }
  return false;
}
// function checkCookie() {
//     var UserName = getCookie("UserName");
//     if(UserName != "") {
//         alert("Welcome again, " + UserName);
//     } else {
//         firstName = prompt("Please enter your UserName:");
//         if(UserName != "" && UserName != null) {
//             setCookie("UserName", UserName, 30);
//         }
//     }
// }

const Cookies = { set, get, check };

export { Cookies };
