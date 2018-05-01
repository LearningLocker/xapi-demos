const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const http = require('http');
const path = require('path');

const createLaunchOnLaunchServer = async (launchServerEndpoint, launchServerAuth, sessionId, xapiActor) => {
  const response = await fetch(`${launchServerEndpoint}/session/${sessionId}/launch`, {
    body: JSON.stringify({
      statement: {
        actor: xapiActor,
      },
      ttl: 10000
    }),
    headers: {
      'authorization': launchServerAuth,
      'content-type': 'application/json',
    },
    method: 'POST'
  });
  const launch = await response.json();
  return launch.key;
};

const expressApp = express();

expressApp.get('/lms', (request, response) => {
  response.setHeader('content-type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'lms.html')).pipe(response);
});

expressApp.get('/content', (request, response) => {
  response.setHeader('content-type', 'text/html');
  fs.createReadStream(path.join(__dirname, 'content.html')).pipe(response);
});

expressApp.get('/launch-content', async (request, response) => {
  const launchServerEndpoint = 'http://my.launchserver';
  const launchServerAuth = 'Basic NTlkZGQzYmY4YTA5ZDAzMzU5OTBiOWZhOjVhZTcyZDA3MjQ4ODdhNWM2MTY4MzEwYQ==';
  const contentLaunchServerEndpoint = `${launchServerEndpoint}/content`;
  const sessionId = 'example-session-id';
  const xapiActor = {
    objectType: 'Agent',
    mbox: 'mailto:test@example.org',
    name: 'Example Actor',
  };
  const launchServerToken = await createLaunchOnLaunchServer(launchServerEndpoint, launchServerAuth, sessionId, xapiActor);
  const tokenUrlParam = `xAPILaunchKey=${launchServerToken}`;
  const endpointUrlParam = `xAPILaunchService=${encodeURIComponent(contentLaunchServerEndpoint)}`;
  response.redirect(`content?${tokenUrlParam}&${endpointUrlParam}`);
});

expressApp.use('/', (request, response) => {
  response.sendStatus(404);
});

const server = http.createServer(expressApp);

server.listen(1337, () => {
  console.log(`Started server on http://127.0.0.1:1337/`);
});
