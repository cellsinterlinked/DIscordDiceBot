module.exports = function (num) {
  let resultDamage = 0;
  let resultEffects = 0;
  let bigArr = [];
 

  for (let i = 1; i <= num; i++) {
    let current = 1 + Math.floor(Math.random() * 6);
    if (current === 1) {
      resultDamage = resultDamage + 1;
      bigArr.push(current);
    } else if (current === 2) {
      resultDamage = resultDamage + 2;
      bigArr.push(current);
    } else if (current === 3 || current === 4) {
      resultDamage = resultDamage;
      bigArr.push(current);
    } else if (current === 5 || current === 6) {
      resultDamage = resultDamage + 1;
      resultEffects = resultEffects + 1;
      bigArr.push(current);
    }
  }
  let result = bigArr.join(",");


  let bigResult = {
    res: result,
    dam: resultDamage,
    effect: resultEffects,
  };
 
  return bigResult;
};
