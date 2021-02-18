const getQueryResult = require('./getQueryResult.js');

const getByUsername = (username) => {
  const sql = 'SELECT * FROM uers WHERE email = ?';
  return getQueryResult(sql, [username]);
}

module.exports = {
  getByUsername
}