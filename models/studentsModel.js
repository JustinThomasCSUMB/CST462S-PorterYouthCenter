const getQueryResult = require('./getQueryResults');

const createStudent = async (username, password, first, last, email) => {
  let sql = 'INSERT INTO staff (username, password, first, last, email) VALUES (?,?,?,?,?)';
  let sqlParams = [username, password, first, last, email];
  console.log(sql + " " + sqlParams);
  return getQueryResult(sql, sqlParams);
};

const updateStudent = async (username, password, first, last, email) => {
  let sql = 'INSERT INTO staff (username, password, first, last, email) VALUES (?,?,?,?,?)';
  let sqlParams = [username, password, first, last, email];
  console.log(sql + " " + sqlParams);
  return getQueryResult(sql, sqlParams);
};

module.exports = {
  createStudent,
  updateStudent
};