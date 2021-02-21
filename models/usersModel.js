const getQueryResult = require('./getQueryResults');

const getByUsername = async (username) => {
  let sql = 'SELECT * FROM staff WHERE username = ?';
  return getQueryResult(sql, [username]);
};

const createUser = async (username, password, first, last, email) => {
  let sql = 'INSERT INTO staff (username, password, first, last, email) VALUES (?,?,?,?,?)';
  let sqlParams = [username, password, first, last, email];
  console.log(sql + " " + sqlParams);
  return getQueryResult(sql, sqlParams);
};

module.exports = {
  getByUsername,
  createUser
};