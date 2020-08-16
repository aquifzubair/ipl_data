const { errorHandler, queryPromise } = require("./../utils");

const query = `SELECT season, COUNT(season) AS num_of_matches FROM matches GROUP BY season;`;

const matchesPerYear = (response) => {
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
  matchesPerYear,
};
