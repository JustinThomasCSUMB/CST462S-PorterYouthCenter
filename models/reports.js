const getQueryResult = require('./getQueryResults');

const getReports = async() => {
  const sql = 'SELECT * FROM students ORDER BY last';
  return getQueryResult(sql);
}

module.exports = {
    getReports
}