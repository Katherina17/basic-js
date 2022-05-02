const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  if(str == '') return '';
  let result ='';
  let count = 1;
  for (let i = 1; i < str.length; i++){
    let curStr = str[i];
    let previous = str[i - 1];
    if (curStr == previous){
      count++;
    } else {
      result += count > 1 ? count + previous : previous;
      count = 1;
    }
  }
  result += count > 1 ? count + str[str.length - 1] : str[str.length - 1];
  return result;
}

// aabbbccc -> count = 2 -> result = "2a"; count = 1 -> count = 2 -> count = 3 -> result "2a3b", count = 1

module.exports = {
  encodeLine
};
