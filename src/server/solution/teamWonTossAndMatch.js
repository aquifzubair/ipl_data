const fs = require("fs");

const teamWonTossAndMatch = (matches) => {
  const teamsWonMatchAndToss = matches.reduce((acc, currVal) => {
    if (!acc[currVal.toss_winner]) {
      if (currVal.toss_winner === currVal.winner) {
        acc[currVal.toss_winner] = 1;
      }
    } else if (acc[currVal.toss_winner]) {
      if (currVal.toss_winner === currVal.winner) {
        acc[currVal.toss_winner]++;
      }
    }
    return acc;
  }, {});

  fs.writeFile(
    "./../output/teamsWonTossAndMatch.json",
    JSON.stringify(teamsWonMatchAndToss),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("Team Win Match and Toss File Saved");
    }
  );
};

module.exports = { teamWonTossAndMatch };
