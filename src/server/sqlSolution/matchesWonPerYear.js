const { errorHandler, queryPromise } = require("./../utils");

const query = `select season,winner,count(id) AS wins from matches where winner != ''  group by season,winner;`;

const matchesWonPerYear = (response) => {
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
  matchesWonPerYear,
};
