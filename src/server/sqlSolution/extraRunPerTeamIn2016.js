const { errorHandler, queryPromise } = require("./../utils");

const query = `SELECT bowling_team, SUM(extra_runs) as extraRuns FROM deliveries WHERE 
                    match_id >= (SELECT id FROM matches WHERE season=2016 ORDER BY id LIMIT 1) and 
                    match_id <= (SELECT id FROM matches WHERE season=2016 ORDER BY id DESC LIMIT 1) 
                    GROUP BY bowling_team;`;

const extraRunPerTeamIn2016 = (response) => {
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
  extraRunPerTeamIn2016,
};
