const fs = require('fs');
const {deliveryOfParticularYear} = require('./commonFunctions')

const topTenEconomicalBowlerIn2015 = (matches, deliveries) => {

    const deliveryOf2015 = deliveryOfParticularYear(matches, deliveries, 2015);
    const bowlerData = [];
  
    for (let delivery of deliveryOf2015) {
      if (bowlerData[delivery.bowler]) {
       const wideBall = delivery.wide_runs || 0;
       const noBall = delivery.noball_runs || 0;
        bowlerData[delivery.bowler].bowl += 1 - wideBall - noBall;
        bowlerData[delivery.bowler].runs += +delivery.total_runs;
      } else {
        bowlerData[delivery.bowler] = {};
        bowlerData[delivery.bowler].bowl = 1;
        bowlerData[delivery.bowler].runs = +delivery.total_runs;
      }
    }
  
    const bowlerEconomy = [];
    const top10Bowler = [];
  
    for (let bowler in bowlerData) {
      bowlerData[bowler].economy = bowlerData[bowler].runs / (bowlerData[bowler].bowl / 6);
      bowlerEconomy.push(bowlerData[bowler].economy);
    }
  
    bowlerEconomy.sort((a, b) => a - b);
  
    for (let bowlers in bowlerData) {
      if (bowlerData[bowlers].economy <= +bowlerEconomy[9]) {
        let finalObj = {};
        finalObj.bowler = Object.values(bowlers).join("");
        finalObj.economy = bowlerData[bowlers].economy;
        top10Bowler.push(finalObj);
      }
    }
  
    top10Bowler.sort((a, b) => a.economy - b.economy);
  
    fs.writeFile(
      "./../output/topTenBestBowlerByEconomy.json",
      JSON.stringify(top10Bowler),
      (err) => {
        if (err) console.error("Not able to write file", err);
        console.log("Top 10 economy bowler in 2015 file Saved!");
      }
    );
  };
  module.exports = {topTenEconomicalBowlerIn2015}