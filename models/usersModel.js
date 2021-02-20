const getQueryResult = require('./getQueryResults');

const getByUsername = async (username) => {
  let sql = 'SELECT * FROM staff WHERE username = ?';
  return getQueryResult(sql, [username]);
}

module.exports = {
  getByUsername
}