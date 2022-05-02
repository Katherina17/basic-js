const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array with heights, sort them except if the value is -1.
 *
 * @param {Array} arr
 * @return {Array}
 *
 * @example
 * arr = [-1, 150, 190, 170, -1, -1, 160, 180]
 *
 * The result should be [-1, 150, 160, 170, -1, -1, 180, 190]
 */
function sortByHeight(arr) {
  let sortedArr = arr.filter(i => i!= -1).sort((num1, num2) => num1 - num2);
  let result = [];
  for (let i = 0, j = 0; i < arr.length; i++){
    if (arr[i] == -1){
      result.push(-1);
    } else {
      result.push(sortedArr[j++]);
    }
  }

  return result;
}

module.exports = {
  sortByHeight
};
