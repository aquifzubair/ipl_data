const http = require("http");
const port = 3000;
const { readJavascriptFile, readHtmlFile, readCssFile, readJsonFile } = require("./utils");

const server = http.createServer((request, response) => {

  switch (request.url) {
    case "/": {
      readHtmlFile("./../client/index.html", response);
      break;
    }

    case "/appjs/matchesPerYear.js": {
      readJavascriptFile("./../client/appjs/matchesPerYear.js", response);
      break;
    }

    case "/matchesPerYear": {
      readJsonFile("./../output/matchesPerYear.json", response);
      break;
    }

    case "/appjs/extraRunPerTeamIn2016.js": {
      readJavascriptFile("./../client/appjs/extraRunPerTeamIn2016.js", response);
      break;
    }

    case "/extraRunPerTeamIn2016": {
      readJsonFile("./../output/extraRunPerTeamIn2016.json", response);
      break;
    }

    case "/appjs/matchesWonPerYear.js": {
      readJavascriptFile("./../client/appjs/matchesWonPerYear.js", response);
      break;
    }

    case "/wonMatchesPerYear": {
      readJsonFile("./../output/wonMatchesPerYear.json", response);
      break;
    }

    case "/appjs/topTenBestEconomicalBowler.js": {
      readJavascriptFile("./../client/appjs/topTenBestEconomicalBowler.js",response);
      break;
    }

    case "/topTenBestBowlerByEconomy": {
      readJsonFile("./../output/topTenBestBowlerByEconomy.json", response);
      break;
    }

    case "/appjs/teamsWonMatchAndToss.js": {
      readJavascriptFile("./../client/appjs/teamsWonMatchAndToss.js", response);
      break;
    }

    case "/teamsWonMatchAndToss": {
      readJsonFile("./../output/teamsWonTossAndMatch.json", response);
      break;
    }

    case "/appjs/strikeRateOfParticularPerson.js": {
      readJavascriptFile("./../client/appjs/strikeRateOfParticularPerson.js",response);
      break;
    }

    case "/strikeRateOfParticularPerson": {
      readJsonFile("./../output/strikeRateOfParticularPerson.json", response);
      break;
    }

    case "/appjs/bowlerOfBestEconomy.js": {
      readJavascriptFile("./../client/appjs/bowlerOfBestEconomy.js", response);
      break;
    }

    case "/bowlerOfBestEconomy": {
      readJsonFile("./../output/bowlerHavingBestEconomyInSuperOver.json", response);
      break;
    }

    case "/appjs/mostTimePlayerDismissedByOtherPlayer.js": {
      readJavascriptFile("./../client/appjs/mostTimePlayerDismissedByOtherPlayer.js",response);
      break;
    }

    case "/mostTimePlayerDismissedByOtherPlayer": {
      readJsonFile("./../output/mostTimePlayerDismissedByOtherPlayer.json",response);

      break;
    }

    case "/appjs/highestNumberOfMomEveryYear.js": {
      readJavascriptFile("./../client/appjs/highestNumberOfMomEveryYear.js",response);
      break;
    }

    case "/highestNumberOfMomEveryYear": {
      readJsonFile("./../output/highestNumberOfMomEveryYear.json", response);
      break;
    }

    case "/app.css": {
      readCssFile("./../client/app.css", response);
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

server.listen(port);
console.log("server is listening at port " + port);
