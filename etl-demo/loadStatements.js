const fetch = require('node-fetch');

const loadStatements = async (xapiStatements) => {
  const xapiEndpoint = 'http://my.learninglocker/data/xAPI/statements';
  const xapiAuth = 'Basic Y2ZhNTk3YWFhZjNmZmYyMWZjYmQ0ODJkNGVhMGVlNzJjNGY0NzhiMDozNmI2ZjI2ZjJmNWY4ZGI2YTVmZGI4ODVkYTUzZjJiZmM2NzE4MTUz';
  const response = await fetch(xapiEndpoint, {
    body: JSON.stringify(xapiStatements),
    headers: {
      'authorization': xapiAuth,
      'content-type': 'application/json',
      'x-experience-api-version': '1.0.0',
    },
    method: 'POST',
  });
  const insertedStatementIds = await response.json();
  return insertedStatementIds;
};

module.exports = loadStatements;
