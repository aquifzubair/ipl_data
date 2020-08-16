const { errorHandler, queryPromise } = require("./../utils");

const strikeRateOfParticularPerson = (response) => {
  const query = `SELECT batsman, season, (SUM(batsman_runs) / count(match_id) * 100) AS strikeRate FROM matches 
                   INNER JOIN deliveries ON  matches.id = deliveries.match_id WHERE deliveries.batsman = 'MS Dhoni'  
                   GROUP BY season;`;

  queryPromise(query)
    .then((data) => {
      response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(JSON.stringify(data));
      response.end();
    })
    .catch((err) => errorHandler(response, err));
};

module.exports = {
  strikeRateOfParticularPerson,
};
