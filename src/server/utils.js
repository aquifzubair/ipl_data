const mysql = require("mysql");
const { host, password, user, database } = require("../../config");
const fs = require("fs");
const dbQuery = require("./sqlSolution/createDbQueries");

const pool = mysql.createPool({
  host: host,
  password: password,
  user: user,
  database:database
});

pool.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });

});


const queryPromise = (query) => {
  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        reject(err.message);
      }
      resolve(results);
    });
  });
};

const loadDataFromCsv = async () => {
  try {
    const data = await queryPromise(dbQuery.numOfRowsInMatchTable);

    if (data[0].num_of_rows == 0){
      await queryPromise(dbQuery.insertIntoMatchesTableQuery)
      console.log("data is inserted in matches")
    }

    else{
      console.log('data is already inserted')
    }

  }

  catch(err){
    throw err;
  }


  try {
    const data = await queryPromise(dbQuery.numOfRowsInDeliveryTable);

    if (data[0].num_of_rows == 0){
      await queryPromise(dbQuery.insertIntoDeliveriesTableQuery)
      console.log("data is inserted in deliveries")
    }

    else{
      console.log('data is already inserted')
    }

  }

  catch(err){
    throw err;
  }
  
};

const createDatabase = async () => {
  
  try{
    await queryPromise(dbQuery.createDbQuery);
    console.log('database created')
  }
  catch(err){
    throw err;
  }


  try{
    await queryPromise(dbQuery.useDbQuery);
    console.log('database selected')
  }
  catch(err){
    throw err;
  }


  try{
    await queryPromise(dbQuery.createTableForDeliveriesQuery);
    console.log('delivery table created')
  }
  catch(err){
    throw err;
  }


  try{
    await queryPromise(dbQuery.createTableForMatchesQuery)    
    console.log('match table created')
  }
  catch(err){
    throw err;
  }


  try{
    await loadDataFromCsv();
  }
  catch(err){
    throw err;
  }


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
  pool.query(query, (err, results) => {
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
