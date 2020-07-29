var http = require("http");
var fs = require("fs");
var port = "3000";

const server = http.createServer(function (request, response) {
  response.writeHead(200, {
    "Content-Type": "text/json",
    "Access-Control-Allow-Origin": "*",
  });

  const readGivenFile = (path) => {
    fs.readFile(path, function (err, content) {
      if (err) {
        response.writeHead(400, {
          "Content-Type": "text/json",
          "Access-Control-Allow-Origin": "*",
        });
        response.write("File not found");
      } else {
        response.write(content);
        response.end();
      }
    });
  };
  switch (request.url) {
    case "/matchesPerYear": {
      readGivenFile("./../output/matchesperYear.json");
      break;
    }
    case "/extraRunPerTeamIn2016": {
      readGivenFile("./../output/extraRunPerTeamIn2016.json");
      break;
    }
    case "/wonMatchesPerYear": {
      readGivenFile("./../output/wonMatchesPerYear.json");
      break;
    }
    case "/topTenBestBowlerByEconomy": {
      readGivenFile("./../output/topTenBestBowlerByEconomy.json");
      break;
    }
    case "/teamsWonMatchAndToss": {
      readGivenFile("./../output/teamsWonMatchAndToss.json");
      break;
    }   
    default: {
      response.writeHead(404, {
        "Content-Type": "text/json",
        "Access-Control-Allow-Origin": "*",
      });
      response.write('404 Oops! page not found')
      response.end();
    }
  }
});

server.listen(port);
console.log("server is listening at port " + port);
