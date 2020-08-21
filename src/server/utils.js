const mysql = require("mysql");
const { host, database, password, user} = require("./../../config");
const fs = require('fs')

const connection = mysql.createConnection({
  host: host,
  database: database,
  password: password,
  user: user,
});

connection.connect((err) => {
    if (err) {
      return console.error("error: " + err.message);
    }
    console.log("Connected to the MySQL server.");
  });

  const createDatabase = async () => {
    const createDbQuery = `CREATE DATABASE IF NOT EXISTS ipl_data;`
    const useDbQuery = `USE ipl_data`;

    const createTableForMatchesQuery = `create table if not exists matches ( id int, season smallint,city char(30), date date, team1 char(50), team2 char(50), toss_winner char(50), toss_decision char(10), result char(10), dl_applied smallint, winner char(50), win_by_runs smallint, win_by_wickets smallint, player_of_match char(50), venue char(100), umpire1 char(50), umpire2 char(50), umpire3 char(50));`
    const createTableForDeliveriesQuery = `create table if not exists deliveries( match_id smallint, inning smallint, batting_team char(50), bowling_team char(50), over smallint, ball smallint, batsman char(100), non_striker char(100), bowler char(100), is_super_over smallint, wide_runs smallint, bye_runs smallint, legbye_runs smallint, noball_runs smallint, penalty_runs smallint, batsman_runs smallint, extra_runs smallint, total_runs smallint, player_dismissed char(100), dismissal_kind char(50), fielder char(100));`
    
    const insertIntoMatchesTableQuery = `LOAD DATA LOCAL INFILE './../data/matches.csv' INTO TABLE matches FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;`
    const insertIntoDeliveriesTableQuery = `LOAD DATA LOCAL INFILE './../data/deliveries.csv' INTO TABLE deliveries FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;`
    
    await queryPromise(createDbQuery);
    await queryPromise(useDbQuery);

    await queryPromise(createTableForMatchesQuery);
    await queryPromise(createTableForDeliveriesQuery);

    await queryPromise(insertIntoMatchesTableQuery);
    await queryPromise(insertIntoDeliveriesTableQuery); 
    
  }

const errorHandler = (response, err) => {
    response.writeHead(500, {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    const message = {
      errorMessage: "Internal server error",
      err,
    };
    response.write(JSON.stringify(message));
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

  const readHtmlFile = (path,response) => {
    readGivenFile(path)
        .then((content) => {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(content);
          response.end();
        })
        .catch((err) => errorHandler(response, err));
  }

  const readJavascriptFile = (path, response) => {
    readGivenFile(path)
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/javascript",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => errorHandler(response, err));
  }

  const readCssFile = (path,response) => {
    readGivenFile(path)
        .then((content) => {
          response.writeHead(200, {
            "Content-Type": "text/css",
            "Access-Control-Allow-Origin": "*",
          });
          response.write(content);
          response.end();
        })
        .catch((err) => errorHandler(response, err));
  }

module.exports = {
    connection,
    errorHandler,
    queryPromise,
    readGivenFile,
    readHtmlFile,
    readJavascriptFile,
    readCssFile,
    createDatabase
}