const { errorHandler, queryPromise } = require("./../utils");

const highestNumberOfMomEveryYear = (response) => {
  const query = `SELECT season, ANY_VALUE(player_of_match) AS player_name, MAX(mom) AS num_of_mom
    FROM (SELECT season,player_of_match, COUNT(player_of_match) AS mom FROM matches 
    GROUP BY season, player_of_match ORDER BY season,COUNT(player_of_match) DESC) AS maximum_mom_table 
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
  highestNumberOfMomEveryYear,
};
