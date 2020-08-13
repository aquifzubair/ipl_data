const http = require("http");
const fs = require("fs");
const mysql = require("mysql");
const config = require("./../../config");
const port = config.port;

const connection = mysql.createConnection({
  host: config.host,
  database: config.database,
  password: config.password,
  user: config.user,
});

connection.connect((err) => {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

const errorHandler = (response, err) => {
  console.error(err);
  response.writeHead(500);
  response.end();
};

const queryPromise = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) {
        reject(err.message);
      }
      resolve(results);
    });
  });
};

const server = http.createServer((request, response) => {
  const readGivenFile = (path) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  };

  switch (request.url) {
    case "/": {
      readGivenFile("./../client/index.html")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/appjs/matchesPerYear.js": {
      readGivenFile("./../client/appjs/matchesPerYear.js")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/matchesPerYearSql": {
      let query = `SELECT season, COUNT(season) AS num_of_matches FROM matches GROUP BY season;`;

      queryPromise(query)
        .then((data) => {
          response.write(JSON.stringify(data));
          response.end();
        })
        .catch((err) => errorHandler(response, err));

      break;
    }

    case "/appjs/extraRunPerTeamIn2016.js": {
      readGivenFile("./../client/appjs/extraRunPerTeamIn2016.js")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/extraRunPerTeamIn2016Sql": {
      let query = `SELECT bowling_team, SUM(extra_runs) as extraRuns FROM deliveries WHERE 
                    match_id >= (SELECT id FROM matches WHERE season=2016 ORDER BY id LIMIT 1) and 
                    match_id <= (SELECT id FROM matches WHERE season=2016 ORDER BY id DESC LIMIT 1) 
                    GROUP BY bowling_team;`;
      queryPromise(query)
        .then((data) => {
          response.write(JSON.stringify(data));
          response.end();
        })
        .catch((err) => errorHandler(response, err));
      break;
    }

    case "/appjs/matchesWonPerYear.js": {
      readGivenFile("./../client/appjs/matchesWonPerYear.js")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/wonMatchesPerYearSql": {
      const query = `select season,winner,count(id) AS wins from matches where winner != ''  group by season,winner;`;
      queryPromise(query)
        .then((data) => {
          response.write(JSON.stringify(data));
          response.end();
        })
        .catch((err) => errorHandler(response, err));
      break;
    }

    case "/appjs/topTenBestEconomicalBowler.js": {
      readGivenFile("./../client/appjs/topTenBestEconomicalBowler.js")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/topTenBestBowlerByEconomySql": {
      let query = `SELECT bowler ,SUM(total_runs)*6 /(COUNT(*)) as economy
                    FROM deliveries WHERE match_id >= (SELECT id FROM matches WHERE season=2015 ORDER BY id LIMIT 1) AND 
                    match_id <= (SELECT id FROM matches WHERE season=2015 ORDER BY id DESC LIMIT 1)
                    GROUP BY bowler ORDER BY economy LIMIT 10;`;
      queryPromise(query)
        .then((data) => {
          response.write(JSON.stringify(data));
          response.end();
        })
        .catch((err) => errorHandler(response, err));
      break;
    }

    case "/appjs/teamsWonMatchAndToss.js": {
      readGivenFile("./../client/appjs/teamsWonMatchAndToss.js")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/teamsWonMatchAndTossSql": {
      let query = `SELECT winner,COUNT(winner) AS num_of_wins FROM matches WHERE winner = toss_winner GROUP BY winner;`;
      queryPromise(query)
        .then((data) => {
          response.write(JSON.stringify(data));
          response.end();
        })
        .catch((err) => errorHandler(response, err));
      break;
    }

    case "/appjs/strikeRateOfParticularPerson.js": {
      readGivenFile("./../client/appjs/strikeRateOfParticularPerson.js")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/strikeRateOfParticularPersonSql": {
      let query = `SELECT batsman, season, (SUM(batsman_runs) / count(match_id) * 100) AS strikeRate FROM matches 
                   INNER JOIN deliveries ON  matches.id = deliveries.match_id WHERE deliveries.batsman = 'MS Dhoni'  
                   GROUP BY season;`;

      queryPromise(query)
        .then((data) => {
          response.write(JSON.stringify(data));
          response.end();
        })
        .catch((err) => errorHandler(response, err));
      break;
    }

    case "/appjs/bowlerOfBestEconomy.js": {
      readGivenFile("./../client/appjs/bowlerOfBestEconomy.js")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/bowlerOfBestEconomySql": {
      const query = `SELECT bowler ,SUM(total_runs) /(COUNT(*)/6) as economy FROM deliveries WHERE is_super_over=1 AND noball_runs>0  GROUP BY bowler ORDER BY economy LIMIT 1;`;
      queryPromise(query)
        .then((data) => {
          response.write(JSON.stringify(data));
          response.end();
        })
        .catch((err) => errorHandler(response, err));
      break;
    }

    case "/appjs/mostTimePlayerDismissedByOtherPlayer.js": {
      readGivenFile("./../client/appjs/mostTimePlayerDismissedByOtherPlayer.js")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/mostTimePlayerDismissedByOtherPlayerSql": {
      const query = `SELECT batsman, bowler , COUNT(player_dismissed) AS dismissal_time FROM deliveries WHERE batsman=player_dismissed GROUP BY player_dismissed,batsman,bowler ORDER BY dismissal_time DESC LIMIT 1; `;
      queryPromise(query)
        .then((data) => {
          response.write(JSON.stringify(data));
          response.end();
        })
        .catch((err) => errorHandler(response, err));
      break;
    }

    case "/appjs/highestNumberOfMomEveryYear.js": {
      readGivenFile("./../client/appjs/highestNumberOfMomEveryYear.js")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/highestNumberOfMomEveryYear": {
      readGivenFile("./../output/highestNumberOfMomEveryYear.json")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    case "/app.css": {
      readGivenFile("./../client/app.css")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/css",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          errorHandler(response, err);
        });
      break;
    }

    default: {
      response.writeHead(404, {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*",
      });
      response.write("404 Oops! page not found");
      response.end();
    }
  }
});

server.listen(port);
// connection.end();

console.log("server is listening at port " + port);
