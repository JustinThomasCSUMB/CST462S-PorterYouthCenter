const getQueryResult = require('./getQueryResults');

const getByUsername = async (username) => {
  let sql = 'SELECT * FROM staff WHERE email = ?';
  return getQueryResult(sql, [username]);
}

module.exports = {
  getByUsername
}