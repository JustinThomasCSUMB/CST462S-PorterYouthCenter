const getQueryResult = require('./getQueryResults');

const getServices = async() => {
  const sql = 'SELECT * FROM services';

  return getQueryResult(sql);
}

module.exports = {
  getServices
}

