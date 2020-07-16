const fs = require("fs");

const matchesPerYear = (json) => {
  const output = json.reduce((acc, currVal) => {
    if (acc[currVal.season]) acc[currVal.season]++;
    else acc[currVal.season] = 1;
    return acc;
  }, {});

  fs.writeFile(
    "./../output/matchesPerYear.json",
    JSON.stringify(output),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("Matches per year file saved!");
    }
  );
};

const matchesWonPerTeamPerYear = (json) => {
  const output = json.reduce((acc, currVal) => {
    if (acc[currVal.season]) {
      if (acc[currVal.season][currVal.winner])
        acc[currVal.season][currVal.winner]++;
      else acc[currVal.season][currVal.winner] = 1;
    } else acc[currVal.season] = {};
    return acc;
  }, {});

  fs.writeFile(
    "./../output/wonMatchesPerYear.json",
    JSON.stringify(output),
    function (err) {
      if (err) console.error("Not able to write file", err);
      console.log("Matches won per team per year file Saved!");
    }
  );
};

module.exports = { matchesPerYear, matchesWonPerTeamPerYear };
