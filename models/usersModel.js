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

const updateUser = async (id, password, first, last, email) => {
  let sql = 'UPDATE STAFF SET first = ?, last = ?, password = ?, email = ? where staffID = ?';
  let sqlParams = [first, last, password, email, id];
  console.log(sql + " " + sqlParams);
  return getQueryResult(sql, sqlParams);
};

const deleteUser = async (id) => {
  console.log("deleteUser: " + id);
  let sql = 'DELETE FROM STAFF where staffID = ?';
  let sqlParams = [id];
  return getQueryResult(sql, sqlParams);
};

module.exports = {
  getByUsername,
  createUser,
  updateUser,
  deleteUser
};