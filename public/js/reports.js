const e = require("express");

$(document).ready(() => {

    $('#showReports').on('click', showReports);
    $('.editBirsButton').on('click', function(){editBirs(this);});

    function editBirs(btn){
        let birsId = btn.val();
        window.location.href = `/birs/${birsId}`;
    }    

    async function showReports(){
        let studentId = $('#students').val();
        let startDateTime = $('#startDateTime');
        let endDateTime = $('#endDateTime');
    
        window.location.href = `/reports/${startDateTime}/${endDateTime}/${studentId}`        
    }// showReports

}); // ready