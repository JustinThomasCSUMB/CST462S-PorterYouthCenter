const { json } = require("express");

$(document).ready(() => {

    $('#submit').on('click', submitBirs);

    /**
     * calls api to submit the birs
     */
    async function submitBirs(){
        const childId = $('#childName').val();
        const email = $('#email').val();
        const dateTime = $('#dateTime').val();
        const staffId = $('#staffName').val();
        const locationId = $('#location').val();
        const numChildren = $('#numChildrenPresent').val();
        const numAdults = $('#numAdultsPresent').val();
        const bodyPartId = $('#bodyPart').val();
        const woundDesc = $('#woundDescription').val();
        const howOccur = $('#howInjuryOccurred').val();
        const howTreated = $('#howInjuryTreated').val();
        const riskBehaviorId = $('#riskBehavior').val();
        const behaviorId = $('#behavior').val();
        // const triggers = //get all that apply
        // const supports = // get all that apply
        const recoveryId = $('#recovery').val();
        // const supportPlanId = $('#') // get all that apply
        // const nextSteps = // get all that apply
        const incidentDesc = $('#incidentDescription').val();
        const managerSig = $('#managerSignature').val();
        const parentSig = $('#parentSignature').val();
        const parentFeedback = $('#parentFeedback');

        let response;
        let birsId = $('#birsId').val();

        if(birsId == ''){
            const url = '/api/submitBirs';
            const params = getParams();
            response = await fetch(url,
                {
                    method: 'POST',
                    body: params,
                    headers: {'Content-Type': 'application/json'}
                });
        }else{
            const url = `/api/updateBirs/${birsId}`;
            const params = getParams();
            response = await fetch(url,
                {
                    method: 'PUT',
                    body: params,
                    headers: {'Content-Type': 'application/json'}
                });
        }        
            
        let data = await response.json();

    }// submitBirs

    /**
     * creats json paramater list for api calls
     */
    function getParams(){

        const params = JSON.stringify(
        {
            childId: childId,
            email: email,
            dateTime: dateTime,
            staffId: staffId,
            locationId: locationId,
            numChildren: numChildren,
            numAdults: numAdults,
            bodyPartId: bodyPartId,
            woundDesc: woundDesc,
            howOccur: howOccur,
            howTreated: howTreated,
            riskBehaviorId: riskBehaviorId,
            behaviorId: behaviorId,

            recoveryId: recoveryId,
            
            incidentDesc: incidentDesc,
            managerSig: managerSig,
            parentSig: parentSig,
            parentFeedback: parentFeedback
        });

        return params;
    }// getParams

});// ready