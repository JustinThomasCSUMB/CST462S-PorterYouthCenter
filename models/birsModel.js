const getQueryResult = require('./getQueryResults');

//TODO: fill in all the single requests

/**
 * returns all students
 */
const getStudents = async() => {
  const studentsQuery = 'SELECT * FROM students ORDER BY last';
  return getQueryResult(sql);
}

/**
 * retuns student based on id
 * @param {id} student id
 */
const getStudent = async(id) => {
  const studentQuery = 'SELECT * FROM students WHERE id = ?';
  return getQueryResult(sql, [id]);
}

/**
 * returns all locations
 */
const getLocations = async() => {
  const locationsQuery = 'SELECT * FROM location';
  return getQueryResult(sql);
}

/**
 * return location based on id
 * @param {id} location id 
 */
const getLocation = async(id) => {
  const locationQuery = 'SELECT * FROM location WHERE id = ?';
  return getQueryResult(sql, [id]);
}

const getChildrenPresent = async() => {
  const childrenPresentQuery = 'SELECT * FROM children_present';
  return getQueryResult(sql);
}

const getAdultsPresent = async() => {
  const adultsPresentQuery = '';
  return getQueryResult(sql);
}

const getBodyPart = async() => {
  const bodyPartyQuery = '';
  return getQueryResult(sql);
}

const getWoundDescription = async() => {
  const woundQuery = '';
  return getQueryResult(sql);
}

const getInjuryOccur = async() => {
  const injuryQuery = '';
  return getQueryResult(sql);
}

const getSituationTreated = async() => {
  const treatmentQuery = '';
  return getQueryResult(sql);
}

const getRiskBehavior = async() => {
  const riskQuery = '';
  return getQueryResult(sql);
}

const getBehavior = async() => {
  const behaviorQuery = '';
  return getQueryResult(sql);
}

const getTriggers = async() => {
  const triggersQuery = '';
  return getQueryResult(sql);
}

const getSupports = async() => {
  const supportsQuery = '';
  return getQueryResult(sql);
}

const getRecovery = async() => {
  const recoveryQuery = '';
  return getQueryResult(sql);
}

const getSupportPlan = async() => {
  const supportPlanQuery = '';
  return getQueryResult(sql);
}

const getNextSteps = async() => {
  const nextStepsQuery = '';
  return getQueryResult(sql);
}

const getIncidentDescription = async() => {
  const incidentDescQuery = '';
  return getQueryResult(sql);
}

const getManagerSignature = async() => {
  const managerSigQuery = '';
  return getQueryResult(sql);
}

const getParentSignature = async() => {
  const parenetSigQuery = '';
  return getQueryResult(sql);
}

const getParentFeedback = async() => {
  const parentFeedbackQuery = '';
  return getQueryResult(sql);
}

// update birs
const updateBirsReport = async(sql, params) => {
  const birsQuery = '';
  return getQueryResult(sql, params);
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

