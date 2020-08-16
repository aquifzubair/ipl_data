const { errorHandler, queryPromise } = require("./../utils");

const teamsWonMatchAndToss = (response) => {
    const query = `SELECT winner,COUNT(winner) AS num_of_wins FROM matches WHERE winner = toss_winner GROUP BY winner;`;
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
}

module.exports = {
    teamsWonMatchAndToss
}