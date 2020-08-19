const csv = require("csvtojson");

const matchCsvFilePath =  "../data/matches.csv";
const deliveryCsvFilePath =  "../data/deliveries.csv";

const {matchesPerYear} = require('./solution/matchesPerYear');
const {matchesWonPerTeamPerYear} = require('./solution/matchesWonPerTeamPerYear.js');
const {extraRunPerTeamIn2016} = require('./solution/extraRunPerTeamIn2016');
const {topTenEconomicalBowlerIn2015} = require('./solution/topTenEconomicalBowlerIn2015');
const {teamWonTossAndMatch} = require('./solution/teamWonTossAndMatch');
const {highestNumberOfMomEveryYear} =require('./solution/highestNumberOfMomEveryYear');
const {particularPlayerDataWithStrikeRate} = require('./solution/particularPlayerDataWithStrikeRate');
const {mostTimePlayerDismissedByOtherPlayer} = require('./solution/mostTimePlayerDismissedByOtherPlayer');
const {bowlerHavingBestEconomyInSuperOver} = require('./solution/bowlerHavingBestEconomyInSuperOver');


async function runFunctions() {

  const matchJsonData = await csv().fromFile(matchCsvFilePath);
  const deliveryJsonData = await csv().fromFile(deliveryCsvFilePath);

  matchesPerYear(matchJsonData);
  matchesWonPerTeamPerYear(matchJsonData);

  extraRunPerTeamIn2016(matchJsonData, deliveryJsonData);
  topTenEconomicalBowlerIn2015(matchJsonData, deliveryJsonData);

  teamWonTossAndMatch(matchJsonData);
  highestNumberOfMomEveryYear(matchJsonData);
  
  particularPlayerDataWithStrikeRate(matchJsonData, deliveryJsonData, "MS Dhoni");
  mostTimePlayerDismissedByOtherPlayer(deliveryJsonData);
  bowlerHavingBestEconomyInSuperOver(deliveryJsonData);
}

module.exports = runFunctions;
