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

const highestNumberOfMOM = (matches) => {
  const allPlayers = matches.reduce((acc, currVal) => {
    if (!acc[currVal.season]) {
      acc[currVal.season] = {};
    } else {
      if (!acc[currVal.season][currVal.player_of_match]) {
        acc[currVal.season][currVal.player_of_match] = 1;
      } else {
        acc[currVal.season][currVal.player_of_match]++;
      }
    }
    return acc;
  }, {});

  let arrayOfPlayerAndMom = Object.keys(allPlayers).map((year) => {
    let mat = Object.entries(allPlayers[year]);
    return mat;
  });

  let arrayOfMaximumMomInEverySeason = arrayOfPlayerAndMom.map((value) => {
    return value.sort((a, b) => b[1] - a[1]).shift();
  });

  let maximumMomPlayerInEverySeason = arrayOfMaximumMomInEverySeason.reduce(
    (acc, currVal) => {
      acc[currVal[0]] = currVal[1];
      return acc;
    },
    {}
  );

  fs.writeFile(
    "./../output/maximumMomPlayerInEverySeason.json",
    JSON.stringify(maximumMomPlayerInEverySeason),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log("maximum no of MOM in a season file saved");
    }
  );
};

//function to get the run and bowl of a player in particular year
const playerRunAndBowlData = (match, deliveries, player, year) => {
  let deliver = deliveryOfParticularYear(match, deliveries, year);
  let batsmanData = {};

  for (let delivery of deliver) {
    if (delivery.batsman == player) {
      if (batsmanData[year]) {
        batsmanData[year].bowl += 1;
        batsmanData[year].runs += +delivery.batsman_runs;
      } else {
        batsmanData[year] = {};
        batsmanData[year].bowl = 1;
        batsmanData[year].runs = +delivery.batsman_runs;
      }
    }
  }

  if (Object.keys(batsmanData).length !== 0) return batsmanData;
};

const playerDataWithEconomy = (match, deliveries, player) => {
  let batsmanDataOfAllYears = [];
  let years = match.map((elem) => elem.season);
  arrayOfYears = [...new Set(years)];
  for (let i = 0; i < arrayOfYears.length; i++) {
    let batsmanDataOfaYear = playerRunAndBowlData(
      match,
      deliveries,
      player,
      arrayOfYears[i]
    );
    batsmanDataOfAllYears.push(batsmanDataOfaYear);
  }

  let strikeRateOfBatsman = batsmanDataOfAllYears.map((elem, i) => {
    let eco = (elem[arrayOfYears[i]].runs / elem[arrayOfYears[i]].bowl) * 100;
    return {
      [arrayOfYears[i]]: eco,
    };
  });

  let strikeRateOfABatsmanInEveryYear = {};
  strikeRateOfABatsmanInEveryYear[player] = strikeRateOfBatsman;

  fs.writeFile(
    "./../output/strikeRateOfParticularPerson.json",
    JSON.stringify(strikeRateOfABatsmanInEveryYear),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log(`strike rate of ${player} is saved`);
    }
  );
};

const mostTimePlayerDismissedByOtherPlayer = (deliveries) => {
  let outDelivery = deliveries.filter((bowl) => bowl.player_dismissed != "");

  let numberOfOuts = {};
  outDelivery.map((bowl) => {
    if (numberOfOuts[`${bowl.batsman} outBy ${bowl.bowler}`]) {
      numberOfOuts[`${bowl.batsman} outBy ${bowl.bowler}`]++;
    } else {
      numberOfOuts[`${bowl.batsman} outBy ${bowl.bowler}`] = 1;
    }
  });

  let sortedNumberOfOuts = Object.entries(numberOfOuts).sort(
    (a, b) => b[1] - a[1]
  );

  const maximumTimes = sortedNumberOfOuts[0][1];

  let playerWithHighestTimesOutByAPlayer = [];
  for (let item of sortedNumberOfOuts) {
    if (item[1] == maximumTimes) {
      playerWithHighestTimesOutByAPlayer.push(item);
    }
  }

  fs.writeFile(
    "./../output/playerWithHighestTimesOutByAPlayer.json",
    JSON.stringify(playerWithHighestTimesOutByAPlayer),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log(
        `player with highest number of time out by a player file saved`
      );
    }
  );
};

// function to get the delivery of only super over
const deliveryOfSuperOver = (deliveries) => {
  let delOfSuperOver = deliveries.filter((delivery) => {
    if (delivery.is_super_over !== "0") {
      return delivery;
    }
  });
  return delOfSuperOver;
};

const ballerWithBestEconomyInSuperOver = (deliveries) => {
  const deliveryOfSuperOvers = deliveryOfSuperOver(deliveries);
  const dataWithBowlEconomy = deliveryOfSuperOvers.reduce((acc, currVal) => {
    let wideBall = +currVal.wide_runs;
    let noBall = +currVal.noball_runs;
    if (acc[currVal.bowler]) {
      acc[currVal.bowler].balls += 1 - wideBall - noBall;
      acc[currVal.bowler].runs += +currVal.total_runs;
    } else {
      acc[currVal.bowler] = {};
      acc[currVal.bowler].balls = 1 - wideBall - noBall;
      acc[currVal.bowler].runs = +currVal.total_runs;
    }
    return acc;
  }, []);

  const economyArray = Object.entries(dataWithBowlEconomy).map((player) => {
    return [[player[0]], player[1].runs / (player[1].balls / 6)];
  });
  const flattenArray = economyArray.flat(2);

  const groupedArrayOfBowlerAndEconomy = [];
  for (let i = 0; i < flattenArray.length; i += 2) {
    groupedArrayOfBowlerAndEconomy.push([flattenArray[i], flattenArray[i + 1]]);
  }

  const bowlerOfBestEconomy = groupedArrayOfBowlerAndEconomy
    .sort((a, b) => a[1] - b[1])
    .shift();

  fs.writeFile(
    "./../output/bowlerOfBestEconomy.json",
    JSON.stringify(bowlerOfBestEconomy),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log(`bowler of best economy  file saved`);
    }
  );
};

module.exports = {
  matchesPerYear,
  matchesWonPerTeamPerYear,
  extraRunPerTeamIn2016,
  topTenEconomicalBowlerIn2015,
  teamWonTheTosAndWonMatch,
  highestNumberOfMOM,
  playerDataWithEconomy,
  mostTimePlayerDismissedByOtherPlayer,
  ballerWithBestEconomyInSuperOver,
};
