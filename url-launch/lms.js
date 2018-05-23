const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');

const expressApp = express();

expressApp.get('/lms', (request, response) => {
  response.setHeader('content-type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'lms.html')).pipe(response);
});

expressApp.get('/content', (request, response) => {
  response.setHeader('content-type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'content.html')).pipe(response);
});

expressApp.use('/', (request, response) => {
  response.sendStatus(404);
});

const server = http.createServer(expressApp);

server.listen(1337, () => {
  console.log(`Started server on http://127.0.0.1:1337/`);
});
