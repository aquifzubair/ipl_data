const csv = require("csvtojson");

const matchCsvFilePath = "./../data/matches.csv";

const  {matchesPerYear, matchesWonPerTeamPerYear } = require("./ipl");

async function runFunctions() {
  // converting data from csv to json
  const matchJsonData = await csv().fromFile(matchCsvFilePath);

  //calling all four functions
  matchesPerYear(matchJsonData);
  matchesWonPerTeamPerYear(matchJsonData);
  
}

runFunctions();
