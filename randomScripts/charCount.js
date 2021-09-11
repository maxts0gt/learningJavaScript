// function charCount(str) {
//   let obj = {};
//   for (let char of str) {
//     char = char.toLowerCase();
//     if (/[a-z0-9]/.test(char)) {
//       obj[char] = ++obj[char] || 1;
//     }
//   }

//   return obj;
// }

function charCount(str) {
  let obj = {};
  for (let char of str) {
    if (isAlphaNumeric(char)) {
      char = char.toLowerCase();
      obj[char] = ++obj[char] || 1;
    }
  }
  return obj;
}

function isAlphaNumeric(char) {
  let code = char.charCodeAt(0);
  if (
    !(code > 47 && code < 58) &&
    !(code > 64 && code < 91) &&
    !(code > 96 && code < 123)
  ) {
    return false;
  }
  return true;
}
