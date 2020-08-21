const http = require("http");
const { port } = require("./../../config");
const portNo = port;

const {readHtmlFile, readJavascriptFile, readCssFile, createDatabase} = require("./utils");
const sqlQueries = require("./sqlSolution/allQueries");

createDatabase();

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
      sqlQueries.matchesPerYear(response);
      break;
    }

    case "/appjs/extraRunPerTeamIn2016.js": {
      readJavascriptFile("./../client/appjs/extraRunPerTeamIn2016.js", response);      
      break;
    }

    case "/extraRunPerTeamIn2016": {
      sqlQueries.extraRunPerTeamIn2016(response);
      break;
    }

    case "/appjs/matchesWonPerYear.js": {
      readJavascriptFile("./../client/appjs/matchesWonPerYear.js", response);      
      break;
    }

    case "/matchesWonPerYear": {
      sqlQueries.matchesWonPerYear(response);
      break;
    }

    case "/appjs/topTenBestEconomicalBowler.js": {
      readJavascriptFile("./../client/appjs/topTenBestEconomicalBowler.js", response);      
      break;
    }

    case "/topTenBestBowlerByEconomy": {
      sqlQueries.topTenBestEconomicalBowler(response);
      break;
    }

    case "/appjs/teamsWonMatchAndToss.js": {
     readJavascriptFile("./../client/appjs/teamsWonMatchAndToss.js", response);  
      break;
    }

    case "/teamsWonMatchAndToss": {
      sqlQueries.teamsWonMatchAndToss(response);
      break;
    }

    case "/appjs/strikeRateOfParticularPerson.js": {
      readJavascriptFile("./../client/appjs/strikeRateOfParticularPerson.js", response);      
      break;
    }

    case "/strikeRateOfParticularPerson": {
      sqlQueries.strikeRateOfParticularPerson(response);
      break;
    }

    case "/appjs/bowlerOfBestEconomy.js": {
      readJavascriptFile("./../client/appjs/bowlerOfBestEconomy.js", response);     
      break;
    }

    case "/bowlerOfBestEconomy": {
      sqlQueries.bowlerOfBestEconomy(response);
      break;
    }

    case "/appjs/mostTimePlayerDismissedByOtherPlayer.js": {
      readJavascriptFile("./../client/appjs/mostTimePlayerDismissedByOtherPlayer.js", response);      
      break;
    }

    case "/mostTimePlayerDismissedByOtherPlayer": {
      sqlQueries.mostTimePlayerDismissedByOtherPlayer(response);
      break;
    }

    case "/appjs/highestNumberOfMomEveryYear.js": {
      readJavascriptFile("./../client/appjs/highestNumberOfMomEveryYear.js", response);      
      break;
    }

    case "/highestNumberOfMomEveryYear": {
      sqlQueries.highestNumberOfMomEveryYear(response);
      break;
    }

    case "/app.css": {
      readCssFile("./../client/app.css",response);
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
