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
    readCssFile
}