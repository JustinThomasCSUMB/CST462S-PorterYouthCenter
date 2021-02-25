const { end } = require('../dbPool');
const getQueryResult = require('./getQueryResults');

const getInjuryReports = async(childId, startDate, endDate) => {
  const injuryReportsQuery = 'SELECT * FROM incidents WHERE studentID = ?';
  return getQueryResult(injuryReportsQuery, [childId, startDate, endDate]);
}

const getInjuryReport = async(startDate, endDate) => {
  const injuryReportQuery = 'SELECT * FROM incidents WHERE studentID = ?';
  return getQueryResult(injuryReportQuery, [childId, startDate, endDate]);
}

const getBehaviorReports= async(childId, startDate, endDate) => {
  const behaviorReportsQuery = 'SELECT * FROM incidents WHERE studentID = ?';
  return getQueryResult(behaviorReportsQuery, [childId, startDate, endDate]);
}

const getBehaviorReport= async(startDate, endDate) => {
  const behaviorReportQuery = 'SELECT * FROM incidents WHERE studentID = ?';
  return getQueryResult(behaviorReportQuery, [startDate, endDate]);
}

const getAllReports = async(startDate, endDate) => {
  const allReports = 'SELECT * FROM incident';
  return getQueryResult(allReports, [startDate, endDate])
}

const getStudentReports = async(startDate, endDate, id) => {
  const studentReports = 'SELECT * FROM incident WHERE studentID = ?';
  return getQueryResult(studentReports, [startDate, endDate, id]);
}

module.exports = {
    getInjuryReport,
    getInjuryReports,
    getBehaviorReport,
    getBehaviorReports,
    getAllReports,
    getStudentReports
}