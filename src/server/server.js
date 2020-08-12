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

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

const errorHandler = (response, err) => {
  console.error(error);
  response.write(err);
  response.writeHead(500);
  response.end();
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
      let sql = `select season, count(season) as num_of_matches from matches group by season;`;
      connection.query(sql, (err, results) => {
        if (err) {
          errorHandler(response, err);
        }
        response.write(JSON.stringify(results));
        response.end();
      });
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
      connection.query(query, (err, results) => {
        if (err) {
          errorHandler(response, err);
        }
        response.write(JSON.stringify(results));
        response.end();
      });
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

    case "/wonMatchesPerYear": {
      readGivenFile("./../output/wonMatchesPerYear.json")
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
      connection.query(query, (err, results) => {
        if (err) {
          errorHandler(response, err);
        }
        response.write(JSON.stringify(results));
        response.end();
      });
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

    case "/teamsWonMatchAndToss": {
      readGivenFile("./../output/teamsWonTossAndMatch.json")
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

    case "/strikeRateOfParticularPerson": {
      readGivenFile("./../output/strikeRateOfParticularPerson.json")
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

    case "/bowlerOfBestEconomy": {
      readGivenFile("./../output/bowlerHavingBestEconomyInSuperOver.json")
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

    case "/mostTimePlayerDismissedByOtherPlayer": {
      readGivenFile("./../output/mostTimePlayerDismissedByOtherPlayer.json")
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
