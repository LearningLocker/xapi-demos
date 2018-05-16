const fetch = require('node-fetch');

const extractComments = async () => {
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/comments';
  const apiResponse = await fetch(apiEndpoint, { method: 'GET' });
  const comments = await apiResponse.json();
  return comments;
};

module.exports = extractComments;
