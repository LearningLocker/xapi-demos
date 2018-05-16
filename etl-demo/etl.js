const extractComments = require('./extractComments');
const transformComments = require('./transformComments');
const loadStatements = require('./loadStatements');

const etl = async () => {
  const comments = await extractComments();
  // console.log(JSON.stringify(comments.slice(0, 1), null, 2));
  const statements = transformComments(comments);
  // console.log(JSON.stringify(statements.slice(0, 1), null, 2));
  const ids = await loadStatements(statements);
  console.log(JSON.stringify(ids.slice(0, 1), null, 2));
};

etl();
