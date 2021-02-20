const e = require("express");

$(document).ready(() => {

    $('#showReports').on('click', showReports);
    $('.editBirsButton').on('click', function(){editBirs(this);});

    /**
     * redirects to the correct birs form based on incident type
     * @param {button} btn  the button clicked (contains id in value)
     */
    function editBirs(btn){
        let birsId = btn.val();
        let isInjury = window.location.href.toLowerCase().includes('injury') ? true : false;
        if(isInjury){
            window.location.href = `/birs/injury/${birsId}`;
        }else{            
            window.location.href = `/birs/behavior/${birsId}`;
        }
        
    }    

    /**
     * displays reports based on student and date
     */
    async function showReports(){
        let studentId = $('#students').val();
        let startDateTime = $('#startDateTime');
        let endDateTime = $('#endDateTime');
    
        window.location.href = `/reports/${startDateTime}/${endDateTime}/${studentId}`        
    }// showReports

}); // ready