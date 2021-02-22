const getQueryResult = require('./getQueryResults');

async function getSections(section) {
  const sql = `SELECT * FROM  ${section}`;
  return await getQueryResult(sql);
}

const createInjury = async (email, child, datetime, staffName, location, numChildren, 
                            numAdults, bodyPart, description, occurred, treated) => {

  let sql = "INSERT INTO INCIDENT (email, studentID, date, staffID, location,  \
  nChildren, nAdults, bodypart, injurydescription, injurycause, injurytreatment) \
  values (?,?,?,?,?,?,?,?,?,?,?)";

  let sqlParams = [email, child, datetime, staffName, location, numChildren,
                  numAdults, bodyPart, description, occurred, treated];
                  
  console.log(sql + " " + sqlParams);
  
  return getQueryResult(sql, sqlParams);
};

const createBehavior = async (email, studentID, date, staffID, location, nChildren, 
	nAdults, riskBehavior, behavior, recovery, incidentDescription, managerSignature) => {

	let sql = "INSERT INTO INCIDENT (email, studentID, date, staffID, location,  \
	nChildren, nAdults, behavior, behaviordescription, recovery, description) \
	values (?,?,?,?,?,?,?,?,?,?,?)";
	  
	let sqlParams = [email, studentID, date, staffID, location, nChildren,
                  nAdults, riskBehavior, behavior, recovery, incidentDescription];

  return getQueryResult(sql, sqlParams);
};

//TODO: fill in all the single requests

/**
 * returns all children
 */
const getchildren = async() => {
  const childrenQuery = 'SELECT * FROM children ORDER BY last';
  return getQueryResult(sql);
}

/**
 * retuns child based on id
 * @param {id} child id
 */
const getChild = async(id) => {
  const childQuery = 'SELECT * FROM children WHERE id = ?';
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

const getBirsParams = async(childId) => {
  var children;
  var email;

  if(childId == '' || childId == null){
    children = getchild();
  }else{
    children
  }

  
  return {child: children, email: email, }
}

module.exports = {
  getchildren,
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
  getParentFeedback,
  getBirsParams,
  getSections,
  createInjury, 
  createBehavior
  // fill in the services
}

