const http = require("http");
const { port } = require("../../config");

const portNo = port;
const { readHtmlFile, readJavascriptFile, readCssFile, queryFunction, createDatabase } = require("./utils");
const sqlQueries = require("./sqlSolution/solutionQuery");

createDatabase();

const server = http.createServer((request, response) => {

  switch (request.url) {
    
    case "/": {
      readHtmlFile("src/client/index.html", response);
      break;
    }

    case "/appjs/matchesPerYear.js": {
      readJavascriptFile("src/client/appjs/matchesPerYear.js", response);
      break;
    }

    case "/matchesPerYear": {
      queryFunction(sqlQueries.matchesPerYear, response);
      break;
    }

    case "/appjs/extraRunPerTeamIn2016.js": {
      readJavascriptFile(
        "src/client/appjs/extraRunPerTeamIn2016.js",
        response
      );
      break;
    }

    case "/extraRunPerTeamIn2016": {
      queryFunction(sqlQueries.extraRunPerTeamIn2016, response);
      break;
    }

    case "/appjs/matchesWonPerYear.js": {
      readJavascriptFile("src/client/appjs/matchesWonPerYear.js", response);
      break;
    }

    case "/matchesWonPerYear": {
      queryFunction(sqlQueries.matchesWonPerYear, response);
      break;
    }

    case "/appjs/topTenBestEconomicalBowler.js": {
      readJavascriptFile(
        "src/client/appjs/topTenBestEconomicalBowler.js",
        response
      );
      break;
    }

    case "/topTenBestBowlerByEconomy": {
      queryFunction(sqlQueries.topTenBestEconomicalBowler, response);
      break;
    }

    case "/appjs/teamsWonMatchAndToss.js": {
      readJavascriptFile("src/client/appjs/teamsWonMatchAndToss.js", response);
      break;
    }

    case "/teamsWonMatchAndToss": {
      queryFunction(sqlQueries.teamsWonMatchAndToss, response);
      break;
    }

    case "/appjs/strikeRateOfParticularPerson.js": {
      readJavascriptFile(
        "src/client/appjs/strikeRateOfParticularPerson.js",
        response
      );
      break;
    }

    case "/strikeRateOfParticularPerson": {
      queryFunction(sqlQueries.strikeRateOfParticularPerson, response);
      break;
    }

    case "/appjs/bowlerOfBestEconomy.js": {
      readJavascriptFile("src/client/appjs/bowlerOfBestEconomy.js", response);
      break;
    }

    case "/bowlerOfBestEconomy": {
      queryFunction(sqlQueries.bowlerOfBestEconomy, response);
      break;
    }

    case "/appjs/mostTimePlayerDismissedByOtherPlayer.js": {
      readJavascriptFile(
        "src/client/appjs/mostTimePlayerDismissedByOtherPlayer.js",
        response
      );
      break;
    }

    case "/mostTimePlayerDismissedByOtherPlayer": {
      queryFunction(sqlQueries.mostTimePlayerDismissedByOtherPlayer, response);
      break;
    }

    case "/appjs/highestNumberOfMomEveryYear.js": {
      readJavascriptFile(
        "src/client/appjs/highestNumberOfMomEveryYear.js",
        response
      );
      break;
    }

    case "/highestNumberOfMomEveryYear": {
      queryFunction(sqlQueries.highestNumberOfMomEveryYear, response);
      break;
    }

    case "/app.css": {
      readCssFile("src/client/app.css", response);
      break;
    }

    default: {
      response.writeHead(404, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      response.write("404 Oops! page not found");
      response.end();
    }
  }
});

server.listen(portNo);

console.log("server is listening at port " + port);
