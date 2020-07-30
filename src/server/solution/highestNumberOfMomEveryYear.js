const fs = require("fs");

const highestNumberOfMomEveryYear = (matches) => {
  const allPlayers = matches.reduce((acc, currVal) => {
    if (!acc[currVal.season]) {
      acc[currVal.season] = {};
    } else {
      if (!acc[currVal.season][currVal.player_of_match]) {
        acc[currVal.season][currVal.player_of_match] = 1;
      } else {
        acc[currVal.season][currVal.player_of_match]++;
      }
    }
    return acc;
  }, {});

  let arrayOfPlayerAndMostMom = [];
  Object.keys(allPlayers).map((year) => {
    let mat = Object.entries(allPlayers[year]);
    mat.sort((a, b) => b[1] - a[1]);
    let highest = mat.shift();
    arrayOfPlayerAndMostMom.push([year, highest[0], highest[1]]);
  });

  const objectOfArrayOfPlayerAndMostMom = arrayOfPlayerAndMostMom.map(
    (elem) => {
      return {
        year: elem[0],
        name: elem[1],
        noOfMom: elem[2],
      };
    }
  );

  fs.writeFile(
    "./../output/highestNumberOfMomEveryYear.json",
    JSON.stringify(objectOfArrayOfPlayerAndMostMom),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("highest number of mom every year file saved");
    }
  );
};

module.exports = { highestNumberOfMomEveryYear };
