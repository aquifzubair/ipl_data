const fs = require('fs');
const {deliveryOfParticularYear} = require('./commonFunctions');


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

  module.exports = {extraRunPerTeamIn2016}