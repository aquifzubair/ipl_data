const fs = require("fs");

const matchesPerYear = (matches) => {
  const matchPerYear = matches.reduce((acc, currVal) => {
    if (acc[currVal.season]) acc[currVal.season]++;
    else acc[currVal.season] = 1;
    return acc;
  }, {});

  fs.writeFile(
    "./../output/matchesperYear.json",
    JSON.stringify(matchPerYear),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("Matches per year file saved!");
    }
  );
};

const matchesWonPerTeamPerYear = (matches) => {
  const matchWonPerYear = matches.reduce((acc, currVal) => {
    if (acc[currVal.season]) {
      if (acc[currVal.season][currVal.winner])
        acc[currVal.season][currVal.winner]++;
      else acc[currVal.season][currVal.winner] = 1;
    } else acc[currVal.season] = {};
    return acc;
  }, {});

  fs.writeFile(
    "./../output/wonMatchesPerYear.json",
    JSON.stringify(matchWonPerYear),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("Matches won per team per year file Saved!");
    }
  );
};

const matchOfParticularYear = (matches, year) => {
  //function to calculate matches in a particular Year
  return matches.filter((match) => match.season == year);
};

const deliveryOfParticularYear = (matches, deliveries, year) => {
  // Function to calculate delivery in a particular Year
  let matchOfYear = matchOfParticularYear(matches, year);
  return deliveries.filter((delivery) => {
    for (let match of matchOfYear) {
      if (delivery.match_id == match.id) return true;
    }
    return false;
  });
};

const extraRunPerTeamIn2016 = (matches, deliveries) => {
  const deliveryOf2016 = deliveryOfParticularYear(matches, deliveries, 2016);
  const extraRunIn2016 = {};

  for (let delivery of deliveryOf2016) {
    if (extraRunIn2016.hasOwnProperty(delivery.bowling_team)) {
      extraRunIn2016[delivery.bowling_team] += +delivery.extra_runs;
    } else {
      extraRunIn2016[delivery.bowling_team] = 0;
    }
  }

  fs.writeFile(
    "./../output/extraRunPerTeamIn2016.json",
    JSON.stringify(extraRunIn2016),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("Extra run per team in 2016 file Saved!");
    }
  );
};

const topTenEconomicalBowlerIn2015 = (matches, deliveries) => {
  const deliveryOf2015 = deliveryOfParticularYear(matches, deliveries, 2015);
  let bowlerData = [];

  for (let delivery of deliveryOf2015) {
    if (bowlerData[delivery.bowler]) {
      let wideBall = delivery.wide_runs || 0;
      let noBall = delivery.noball_runs || 0;
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
    bowlerData[bowler].economy =
      bowlerData[bowler].runs / (bowlerData[bowler].bowl / 6);
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

const teamWonTheTosAndWonMatch = (matches) => {
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
    "./../output/teamsWonMatchAndToss.json",
    JSON.stringify(teamsWonMatchAndToss),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("Team Win Match and Toss File Saved");
    }
  );
};

module.exports = {
  matchesPerYear,
  matchesWonPerTeamPerYear,
  extraRunPerTeamIn2016,
  topTenEconomicalBowlerIn2015,
  teamWonTheTosAndWonMatch,
};
