const { errorHandler, queryPromise } = require("./../utils");

const topTenBestEconomicalBowler = (response) => {
    const query = `SELECT bowler ,SUM(total_runs)*6 /(COUNT(*)) as economy
                    FROM deliveries WHERE match_id >= (SELECT id FROM matches WHERE season=2015 ORDER BY id LIMIT 1) AND 
                    match_id <= (SELECT id FROM matches WHERE season=2015 ORDER BY id DESC LIMIT 1)
                    GROUP BY bowler ORDER BY economy LIMIT 10;`;
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
    topTenBestEconomicalBowler
}