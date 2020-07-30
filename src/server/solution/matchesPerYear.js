const fs = require("fs");

const matchesPerYear = (matches) => {
  const matchPerYear = matches.reduce((acc, currVal) => {
    if (acc[currVal.season]) {
      acc[currVal.season]++;
    } else {
      acc[currVal.season] = 1;
    }
    return acc;
  }, {});

  fs.writeFile(
    "./../output/matchesPerYear.json",
    JSON.stringify(matchPerYear),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("Matches per year file saved!");
    }
  );
};

module.exports = { matchesPerYear };
