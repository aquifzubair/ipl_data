const { errorHandler, queryPromise } = require("./../utils");

const mostTimePlayerDismissedByOtherPlayer = (response) => {
  const query = `SELECT batsman, bowler , COUNT(player_dismissed) AS dismissal_time FROM deliveries WHERE batsman=player_dismissed GROUP BY player_dismissed,batsman,bowler ORDER BY dismissal_time DESC LIMIT 1; `;
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
  mostTimePlayerDismissedByOtherPlayer,
};
