const getQueryResult = require('./getQueryResults');

const createStudent = async (first, last, contactname, email) => {
  let sql = 'INSERT INTO STUDENT (first, last, contactname, email) VALUES (?,?,?,?)';
  let sqlParams = [first, last, contactname, email];
  console.log(sql + " " + sqlParams);
  return getQueryResult(sql, sqlParams);
};

const updateStudent = async (id, first, last, contactname, email) => {
  let sql = 'UPDATE STUDENT SET first = ?, last = ?, contactname = ?, email = ? where studentID = ?';
  let sqlParams = [first, last, contactname, email, id];
  console.log(sql + " " + sqlParams);
  return getQueryResult(sql, sqlParams);
};

const deleteStudent = async (id) => {
  let sql = 'DELETE FROM STUDENT where studentID = ?';
  let sqlParams = [id];
  return getQueryResult(sql, sqlParams);
};

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent
};