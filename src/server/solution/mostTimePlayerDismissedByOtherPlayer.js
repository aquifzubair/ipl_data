const fs = require("fs");

const mostTimePlayerDismissedByOtherPlayer = (deliveries) => {
  const outDelivery = deliveries.filter((bowl) => bowl.player_dismissed != "");

  const numberOfOuts = {};
  const combinationArray = [];
  
  outDelivery.map((bowl) => {
    if (numberOfOuts[`${bowl.batsman},outBy,${bowl.bowler}`]) {
      numberOfOuts[`${bowl.batsman},outBy,${bowl.bowler}`]++;
    } else {
      numberOfOuts[`${bowl.batsman},outBy,${bowl.bowler}`] = 1;
      combinationArray.push([bowl.batsman, bowl.bowler]);
    }
  });

  const sortedNumberOfOuts = Object.entries(numberOfOuts).sort(
    (a, b) => b[1] - a[1]
  );

  const maximumTimes = sortedNumberOfOuts[0][1];

  const playerWithHighestTimesOutByAPlayer = [];
  for (let item of sortedNumberOfOuts) {
    if (item[1] == maximumTimes) {
      playerWithHighestTimesOutByAPlayer.push(item);
    }
  }

  const objArray = [];

  combinationArray.map((elem) => {
    for (let item of playerWithHighestTimesOutByAPlayer) {
      if (elem[0] == item[0].split(",")[0] && elem[1] == item[0].split(",")[2]) {
        objArray.push({
          batsman: elem[0],
          outBy: elem[1],
          outTimes: item[1],
        });
      }
    }
  });

  fs.writeFile(
    "./../output/mostTimePlayerDismissedByOtherPlayer.json",
    JSON.stringify(objArray),
    (err) => {
      if (err) console.error("Not able to write file", err);
      console.log(
        `most times player dismissed by other player file saved`
      );
    }
  );
};

module.exports = { mostTimePlayerDismissedByOtherPlayer };
