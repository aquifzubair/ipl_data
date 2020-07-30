const fs = require("fs");

const matchesWonPerTeamPerYear = (matches) => {
  const matchWonPerYear = matches.reduce((acc, currVal) => {
    if (acc[currVal.season]) {
      if (acc[currVal.season][currVal.winner]) {
        acc[currVal.season][currVal.winner]++;
      } else {
        acc[currVal.season][currVal.winner] = 1;
      }
    } else {
      acc[currVal.season] = {};
    }
    return acc;
  }, {});

  fs.writeFile(
    "./../output/wonMatchesPerYear.json",
    JSON.stringify(matchWonPerYear),
    (err) => {
      if (err) {
        console.error("Not able to write file", err);
      }
      console.log("Matches won per team per year file Saved!");
    }
  );
};

module.exports = { matchesWonPerTeamPerYear };
