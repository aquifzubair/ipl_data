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

const extraRunPerTeamIn2016 = (match, delivery) => {
  const dataOf2016 = [];
  const output = { 2016: {} };
  for (let item of match) {
    if (item.season == 2016) {
      dataOf2016.push(item);
    }
  }
  const arrayOfIds = dataOf2016.map((item) => item.id);
  for (var item of delivery) {
    for (let i = 0; i < arrayOfIds.length; i++) {
      if (item.match_id == arrayOfIds[i]) {
        if (output["2016"].hasOwnProperty(item.bowling_team)) {
          output["2016"][item.bowling_team] += parseInt(item.extra_runs);
        } else {
          output["2016"][item.bowling_team] = 0;
        }
      }
    }
  }
  fs.writeFile(
    "./../output/extraRunPerTeamIn2016.json",
    JSON.stringify(output),
    function (err) {
      if (err) console.error("Not able to write file", err);
      console.log("Extra run per team in 2016 file Saved!");
    }
  );
};

module.exports = {
  matchesPerYear,
  matchesWonPerTeamPerYear,
  extraRunPerTeamIn2016,
};
