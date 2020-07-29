const csv = require("csvtojson");

const matchCsvFilePath =
  "/home/aquif/Desktop/javascript_drill/aquif_ipl_data_project/src/data/matches.csv";
const deliveryCsvFilePath =
  "/home/aquif/Desktop/javascript_drill/aquif_ipl_data_project/src/data/deliveries.csv";

const {
  matchesPerYear,
  matchesWonPerTeamPerYear,
  extraRunPerTeamIn2016,
  topTenEconomicalBowlerIn2015,
  teamWonTheTosAndWonMatch,
} = require("./ipl");

async function runFunctions() {
  // converting data from csv to json
  const matchJsonData = await csv().fromFile(matchCsvFilePath);
  const deliveryJsonData = await csv().fromFile(deliveryCsvFilePath);

  // calling all  functions
  matchesPerYear(matchJsonData);
  matchesWonPerTeamPerYear(matchJsonData);
  extraRunPerTeamIn2016(matchJsonData, deliveryJsonData);
  topTenEconomicalBowlerIn2015(matchJsonData, deliveryJsonData);
  teamWonTheTosAndWonMatch(matchJsonData);
}

runFunctions();
