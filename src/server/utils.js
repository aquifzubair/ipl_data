const mysql = require("mysql");
const { host, password, user } = require("../../config");
const fs = require("fs");
const dbQuery = require("./sqlSolution/createDbQueries");

const connection = mysql.createConnection({
  host: host,
  password: password,
  user: user,
});

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected to the MySQL server.....");
  }
});

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

const loadDataFromCsv = () => {
  queryPromise(dbQuery.numOfRowsInMatchTable)
    .then((data) => {
      if (data[0].num_of_rows == 0) {
        queryPromise(dbQuery.insertIntoMatchesTableQuery)
          .then(() => console.log("data is inserted in matches"))
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));

  queryPromise(dbQuery.numOfRowsInDeliveryTable)
    .then((data) => {
      if (data[0].num_of_rows == 0) {
        queryPromise(dbQuery.insertIntoDeliveriesTableQuery)
          .then(() => console.log("data is inserted in deliveries"))
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));
};

const createDatabase = () => {
  let promises = [
    queryPromise(dbQuery.createDbQuery),
    queryPromise(dbQuery.useDbQuery),
    queryPromise(dbQuery.createTableForDeliveriesQuery),
    queryPromise(dbQuery.createTableForMatchesQuery),
  ];

  Promise.all(promises)
    .then(() => loadDataFromCsv())
    .catch((err) => console.error(err));
};

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

const queryFunction = (query, response) => {
  connection.query(query, (err, results) => {
    if (err) {
      errorHandler(response, err);
    } else {
      response.writeHead(200, {
        "Content-Type": "text/javascript",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(JSON.stringify(results));
      response.end();
    }
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

const readHtmlFile = (path, response) => {
  readGivenFile(path)
    .then((content) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(content);
      response.end();
    })
    .catch((err) => errorHandler(response, err));
};

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
};

const readCssFile = (path, response) => {
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
};

module.exports = {
  errorHandler,
  queryPromise,
  readGivenFile,
  readHtmlFile,
  readJavascriptFile,
  readCssFile,
  createDatabase,
  queryFunction,
};
