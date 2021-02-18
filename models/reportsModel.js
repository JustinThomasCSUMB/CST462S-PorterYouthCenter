const getQueryResult = require('./getQueryResults');

const getReports = async(dateStart, dateEnd) => {
  const sql = 'SELECT * FROM incidents';
  return getQueryResult(sql);
}

const getReports = async(id) => {
  const sql = 'SELECT * FROM incidents WHERE studentID = ?';
  return getQueryResult(sql, [id]);
}

module.exports = {
    getReports
}