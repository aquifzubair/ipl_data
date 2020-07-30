const fs = require("fs");
const { deliveryOfSuperOver } = require("./commonFunctions");

const bowlerHavingBestEconomyInSuperOver = (deliveries) => {
  const deliveryOfSuperOvers = deliveryOfSuperOver(deliveries);

  const dataWithBowlEconomy = deliveryOfSuperOvers.reduce((acc, currVal) => {
    let wideBall = +currVal.wide_runs;
    let noBall = +currVal.noball_runs;
    if (acc[currVal.bowler]) {
      acc[currVal.bowler].balls += 1 - wideBall - noBall;
      acc[currVal.bowler].runs += +currVal.total_runs;
    } else {
      acc[currVal.bowler] = {};
      acc[currVal.bowler].balls = 1 - wideBall - noBall;
      acc[currVal.bowler].runs = +currVal.total_runs;
    }
    return acc;
  }, []);

  const economyArray = Object.entries(dataWithBowlEconomy).map((player) => {
    return [[player[0]], player[1].runs / (player[1].balls / 6)];
  });

  const flattenArray = economyArray.flat(2);

  const groupedArrayOfBowlerAndEconomy = [];
  for (let i = 0; i < flattenArray.length; i += 2) {
    groupedArrayOfBowlerAndEconomy.push([flattenArray[i], flattenArray[i + 1]]);
  }

  const bowlerOfBestEconomy = groupedArrayOfBowlerAndEconomy.sort((a, b) => a[1] - b[1]).shift();

  const objectOfBowlerOfBestEconomy = {
    name: bowlerOfBestEconomy[0],
    economy: bowlerOfBestEconomy[1],
  };

  fs.writeFile(
    "./../output/bowlerHavingBestEconomyInSuperOver.json",
    JSON.stringify(objectOfBowlerOfBestEconomy),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log(`bowler of best economy  file saved`);
    }
  );
};

module.exports = { bowlerHavingBestEconomyInSuperOver };
