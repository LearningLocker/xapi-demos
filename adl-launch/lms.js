const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const http = require('http');

const createLaunchOnLaunchServer = async (launchServerEndpoint, launchServerAuth, sessionId, xapiActor) => {
  const response = await fetch(`${launchServerEndpoint}/session/${sessionId}/launch`, {
    body: JSON.stringify({
      statement: {
        actor: xapiActor,
      },
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

expressApp.get('/lms.html', (request, response) => {
  response.setHeader('content-type', 'text/html');
  fs.createReadStream('./lms.html').pipe(response);
});

expressApp.get('/content.html', (request, response) => {
  response.setHeader('content-type', 'text/html');
  fs.createReadStream('./content.html').pipe(response);
});

expressApp.get('/launch-content', async (request, response) => {
  const launchServerEndpoint = '';
  const launchServerAuth = '';
  const sessionId = 'example-session-id';
  const xapiActor = {
    objectType: 'Agent',
    mbox: 'mailto:test@example.org',
    name: 'Example Actor',
  };
  const launchServerToken = await createLaunchOnLaunchServer(launchServerEndpoint, launchServerAuth, sessionId, xapiActor);
  response.redirect(`content.html?xAPILaunchKey=${launchServerToken}&xAPILaunchService=${launchServerEndpoint}`);
});

expressApp.use('/', (request, response) => {
  response.sendStatus(404);
});

const server = http.createServer(expressApp);

server.listen(1337, () => {
  console.log(`Started server on http://127.0.0.1:1337/`);
});
