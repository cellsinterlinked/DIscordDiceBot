module.exports = function (
    sides,
    diceNum,
    target,
    critRange,
    compRange,
 
  ) {
 
    if (sides > 20 || diceNum > 5 ) {
      return "error";
    }
  
    
    let complications = 0
    let success = 0
  
    let resultArr = []
    for(let i = 1; i <= diceNum; i++) {
  
      let current = 1 + Math.floor(Math.random() * sides)
      resultArr.push(current)
      
      if (current <= critRange) {
        success = success + 2
      } else if (current <= target) {
        success = success + 1 
      } else if (current >= compRange) {
        complications = complications + 1
      }
  
    }
  
    let result = resultArr.join(",")
  
    let bigResult = {
      res: result,
      targ: target,
      critR: critRange,
      compR: compRange,
      comps: complications,
      succ: success
      
    };
  
    return bigResult;
  };
  