const { json } = require("express");

$(document).ready(() => {

    $('#submit').on('click', submitBirs); // may want form submit for instead doesn't really matter though
    
    /**
     * retuns object containing shared birs information
     */
    function getCommonBirsParams() {
        const childId = $('#childName').val();
        const email = $('#email').val();
        const dateTime = $('#dateTime').val();
        const staffId = $('#staffName').val();
        const locationId = $('#location').val();
        const numChildren = $('#numChildrenPresent').val();
        const numAdults = $('#numAdultsPresent').val();
        const managerSig = $('#managerSignature').val();
        const parentSig = $('#parentSignature').val();
        const parentFeedback = $('#parentFeedback');

        return {
            childId: childId,
            email: email,
            dateTime: dateTime,
            staffId: staffId,
            locationId: locationId,
            numChildren: numChildren,
            numAdults: numAdults,
            managerSig: managerSig,
            parentSig: parentSig,
            parentFeedback: parentFeedback
        };
    }// getCommonBirsParams

    /**
     * gathers all info needed to submit Behavior Birs
     */
    function getBehaviorBirsParams(){
        let params = getCommonBirsParams(); 
        params.riskBehaviorId = $('#riskBehavior').val();
        params.behaviorId = $('#behavior').val();
        // const triggers = //get all that apply
        // const supports = // get all that apply
        params.recoveryId = $('#recovery').val();
        // const supportPlanId = $('#') // get all that apply
        // const nextSteps = // get all that apply
        params.incidentDesc = $('#incidentDescription').val();

        return params;
    }

    /**
     * gathers all info needed to submit Injury Birs
     */
    function getInjuryBirsParams(){
        let params = getCommonBirsParams();
        params.bodyPartId = $('#bodyPart').val();
        params.woundDesc = $('#woundDescription').val();
        params.howOccur = $('#howInjuryOccurred').val();
        params.howTreated = $('#howInjuryTreated').val();
        
        return params;
    }

    /**
     * calls api to submit or update an injury/ behavior birs
     */
    async function submitBirs() {
        let isInjury = window.location.href.toLowerCase().includes('injury') ? true : false;
        // true if form is being edited/ birsId is not null
        let birsId = $('#birsId').val();
        let isEditing =  (birsId == '' || birsId == undefined || birsId == null) ? false : true;
        let url;
        let params;
        let method;
        
        if(isInjury){
            params = getInjuryBirsParams();
        }else{
            params = getBehaviorBirsParams();
        }

        if(isEditing){
            method = 'PUT';
            if(isInjury){
                url = '/api/updateInjuryBirs/';
            }else{
                url = '/api/updateBehaviorBirs/';
            }
        }else{
            method = 'POST';
            if(isInjury){
                url = '/api/submitInjuryBirs/';
            }else{
                url = '/api/submitBehaviorBirs/';
            }
        }

        let response = await fetch(url,
            {
                method: method,
                body: params,
                headers: {'Content-Type': 'application/json'}
            });
      
        let data = await response.json();

    }// submitBirs

});// ready