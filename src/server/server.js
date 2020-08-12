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

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

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
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
        });
      break;
    }

    case "/matchesPerYearSql": {
      let sql = `select season, count(season) as num_of_matches from matches group by season;`;
      connection.query(sql, (error, results) => {
        if (error) {
          console.error(error.message);
          response.writeHead(500);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
        });
      break;
    }

    case "/extraRunPerTeamIn2016": {
      readGivenFile("./../output/extraRunPerTeamIn2016.json")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          response.writeHead(500, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
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
          response.writeHead(500, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
        });
      break;
    }

    case "/topTenBestBowlerByEconomy": {
      readGivenFile("./../output/topTenBestBowlerByEconomy.json")
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => {
          response.writeHead(500, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
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
          response.writeHead(500, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
          response.writeHead(500, {
            "Content-Type": "text/css",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(err);
          response.end();
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
