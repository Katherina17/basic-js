const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */

function dateSample(sampleActivity){
  if (sampleActivity == undefined) return false;
  if (typeof(sampleActivity) != 'string') return false;
  if (isNaN(sampleActivity)) return false;
  let num = Number(sampleActivity);
  if (num > MODERN_ACTIVITY) return false;
  if (num <= 0) return false;
  let n = MODERN_ACTIVITY  / num;
  let k = 0.693 / HALF_LIFE_PERIOD;
  let t = Math.log(n) / k;
  return Math.ceil(t);
}
module.exports = {
  dateSample
};
