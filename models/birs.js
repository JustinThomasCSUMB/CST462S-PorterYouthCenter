const getQueryResult = require('./getQueryResults');

//TODO: fill in all the single requests

/**
 * returns all students
 */
const getStudents = async() => {
  const sql = 'SELECT * FROM students ORDER BY last';
  return getQueryResult(sql);
}

/**
 * retuns student based on id
 * @param {id} student id
 */
const getStudent = async(id) => {
  const sql = 'SELECT * FROM students WHERE id = ?'
  return getQueryResult(sql, [id]);
}

/**
 * returns all locations
 */
const getLocations = async() => {
  const sql = 'SELECT * FROM location'
  return getQueryResult(sql);
}

/**
 * return location based on id
 * @param {id} location id 
 */
const getLocation = async(id) => {
  const sql = 'SELECT * FROM location WHERE id = '
  return getQueryResult(sql, [id]);
}

const getChildrenPresent = async() => {
  const sql = 'SELECT * FROM children_present'
  return getQueryResult(sql);
}

/**
 * return number of children based on id
 * @param {id} location id 
 */
const getLocation = async(id) => {
  const sql = 'SELECT * FROM location WHERE id = '
  return getQueryResult(sql, [id]);
}


const getAdultsPresent = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getBodyPart = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getWoundDescription = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getInjuryOccur = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getSituationTreated = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getRiskBehavior = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getBehavior = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getTriggers = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getSupports = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getRecovery = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getSupportPlan = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getNextSteps = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getIncidentDescription = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getManagerSignature = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getParentSignature = async() => {
  const sql = ''
  return getQueryResult(sql);
}

const getParentFeedback = async() => {
  const sql = ''
  return getQueryResult(sql);
}

// update birs
const updateBirsReport = async(sql, params) => {
  const sql = ''
  return getQueryResult(sql, params)
}

module.exports = {
  getStudents,
  getLocations,
  getChildrenPresent,
  getAdultsPresent,
  getBodyPart,
  getWoundDescription,
  getInjuryOccur,
  getSituationTreated,
  getRiskBehavior,
  getTriggers,
  getSupports,
  getRecovery,
  getSupportPlan,
  getNextSteps,
  getIncidentDescription,
  getManagerSignature,
  getParentSignature,
  getParentFeedback
  // fill in the services
}

