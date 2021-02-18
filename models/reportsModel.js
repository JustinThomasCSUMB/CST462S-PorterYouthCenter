const getQueryResult = require('./getQueryResults');

const getReports = async(dateStart, dateEnd) => {
  const reportsQuery = 'SELECT * FROM incidents';
  return getQueryResult(sql);
}

const getReport = async(id) => {
  const reportQuery = 'SELECT * FROM incidents WHERE studentID = ?';
  return getQueryResult(sql, [id]);
}

module.exports = {
    getReports
}