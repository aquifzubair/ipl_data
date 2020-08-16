const { errorHandler, queryPromise } = require("./../utils");

const bowlerOfBestEconomy = (response) => {
  const query = `SELECT bowler ,SUM(total_runs) /(COUNT(*)/6) as economy FROM deliveries 
    WHERE is_super_over=1 AND noball_runs>0  GROUP BY bowler ORDER BY economy LIMIT 1;`;
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
  bowlerOfBestEconomy,
};
