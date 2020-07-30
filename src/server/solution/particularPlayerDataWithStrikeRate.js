const fs = require('fs');
const {playerRunAndBowlData} = require('./commonFunctions')

const particularPlayerDataWithStrikeRate = (match, deliveries, player) => {
    const batsmanDataOfAllYears = [];
    const years = match.map((elem) => elem.season);
    arrayOfYears = [...new Set(years)];
    for (let i = 0; i < arrayOfYears.length; i++) {
      let batsmanDataOfaYear = playerRunAndBowlData(
        match,
        deliveries,
        player,
        arrayOfYears[i]
      );
      batsmanDataOfAllYears.push(batsmanDataOfaYear);
    }
  
    const strikeRateOfBatsman = batsmanDataOfAllYears.map((elem, i) => {
      let eco = (elem[arrayOfYears[i]].runs / elem[arrayOfYears[i]].bowl) * 100;
      return {
        [arrayOfYears[i]]: eco,
      };
    });
  
    const strikeRateOfABatsmanInEveryYear = {};
    strikeRateOfABatsmanInEveryYear[player] = strikeRateOfBatsman;
  
    fs.writeFile(
      "./../output/strikeRateOfParticularPerson.json",
      JSON.stringify(strikeRateOfABatsmanInEveryYear),
      (err) => {
        if (err) console.error("Not able to write file", err);
        console.log(`strike rate of ${player} is saved`);
      }
    );
  };

  module.exports = {particularPlayerDataWithStrikeRate}
  