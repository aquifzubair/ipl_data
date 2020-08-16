const fs = require("fs");

const errorHandler = (response, err) => {
  response.writeHead(500, {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  const message = {
    message:'Internal Server error',
    errorMessage: err.message,
  };
  response.write(JSON.stringify(message));
  response.end();
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

const readJsonFile = (path, response) => {
  readGivenFile(path)
    .then((content) => {
      response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      response.write(content);
      response.end();
    })
    .catch((err) => errorHandler(response, err));
};

module.exports = {
  errorHandler,
  readHtmlFile,
  readJavascriptFile,
  readCssFile,
  readJsonFile,
};
