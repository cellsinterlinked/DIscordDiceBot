module.exports = function (
  sides,
  diceNum,
  target,
  critRange,
  compRange,
  creatureType
) {
  const types = ["humanoids", "misterHandy", "quadruped", "flying"];
  if (sides > 20 || diceNum > 4 || types.includes(creatureType) === false) {
    return "error";
  }

  const locations = {
    humanoids: [
      "Head",
      "Torso",
      "Left Arm",
      "Right Arm",
      "Left Leg",
      "Right Leg",
    ],
    minsterHandy: ["Optics", "Main Body", "Arm1", "Arm2", "Arm3", "Thruster"],
    quadruped: [
      "Head",
      "Torso",
      "Left Front Leg",
      "Right Front Leg",
      "Left Hind Leg",
      "Right Hind Leg",
    ],
    flying: ["Head", "Torso", "Left Wing", "Right Wing", "Legs", "Legs"],
  };

  let result = (1 + Math.floor(Math.random() * sides)) * diceNum;

  let locationPerc = 1 + Math.floor(Math.random() * 20);

  let hitLocation;
  if (locationPerc < 3) {
    hitLocation = locations[creatureType][0];
  } else if (locationPerc > 2 && locationPerc < 9) {
    hitLocation = locations[creatureType][1];
  } else if (locationPerc > 8 && locationPerc < 12) {
    hitLocation = locations[creatureType][2];
  } else if (locationPerc > 11 && locationPerc < 15) {
    hitLocation = locations[creatureType][3];
  } else if (locationPerc > 14 && locationPerc < 18) {
    hitLocation = locations[creatureType][4];
  } else if (locationPerc > 17 && locationPerc < 21) {
    hitLocation = locations[creatureType][5];
  }

  let bigResult = {
    res: result,
    hitloc: hitLocation,
    targ: target,
    critR: critRange,
    compR: compRange,
  };

  return bigResult;
};
