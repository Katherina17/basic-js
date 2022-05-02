const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * commands list: --double-next, --double-prev, --discard-next, --discard-prev
 * 
 */
function transform(arr) {
  if (arr == undefined) throw new Error("'arr' parameter must be an instance of the Array!");
  if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!");
  let newArr = [];
  for (let i = 0; i < arr.length; i++){
    if(!isCommand(arr[i])) {
      newArr.push(...applyNeighbours(arr, i));
    }
  }
  return newArr;
}

function applyNeighbours(arr, index) {
  let result = [];
  if(index - 1 >= 0 && index + 1 < arr.length) {
    if(!isCommand(arr[index - 1]) && !isCommand(arr[index + 1])) {
      result.push(arr[index]);
    }
    else if(!isCommand(arr[index - 1]) && isCommand(arr[index + 1])) {
      if(arr[index + 1] == '--double-prev') {
        for(let i = 0; i < 2; i++) result.push(arr[index]);
      }
      else if(arr[index + 1] == '--discard-prev') {}
      else result.push(arr[index]);
    }
    else if(isCommand(arr[index - 1]) && !isCommand(arr[index + 1])) {
      if(arr[index - 1] == '--double-next') {
        for(let i = 0; i < 2; i++) result.push(arr[index]);
      }
      else if(arr[index - 1] == '--discard-next') {}
      else result.push(arr[index]);
    }
    else {
      if(arr[index - 1] == '--discard-next') {}
      else if(arr[index - 1] == '--double-next' && arr[index + 1] == '--double-prev') {
        for(let i = 0; i < 3; i++) result.push(arr[index]);
      }
      else if(arr[index - 1] == '--double-next' && arr[index + 1] == '--discard-prev') {
        result.push(arr[index]);
      }
      else result.push(arr[index]);
    }
  }
  else {
    if(index - 1 < 0) {
      if(!isCommand(arr[index + 1])) {
        result.push(arr[index]);
      }
      else {
        if(arr[index + 1] == '--discard-prev') {}
        else if(arr[index + 1] == '--double-prev'){
          for(let i = 0; i < 2; i++) result.push(arr[index]);
        }
        else result.push(arr[index]);
      }
    }
    if(index + 1 >= arr.length) {
      if(!isCommand(arr[index - 1])) {
        result.push(arr[index]);
      }
      else {
        if(arr[index - 1] == '--discard-next') {}
        else if(arr[index - 1] == '--double-next'){
          for(let i = 0; i < 2; i++) result.push(arr[index]);
        }
        else result.push(arr[index]);
      }
    }
  }
  return result;
}

function isCommand(item) {
  return item == '--discard-next' || item == '--discard-prev' || item == '--double-next' || item == '--double-prev';
}

module.exports = {
  transform
};
