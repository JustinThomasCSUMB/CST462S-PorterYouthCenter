//const e = require("express");

$(document).ready(() => {

    $('#showReports').click(showReports);
    $('.editBirsButton').click(function(){editBirs(this);});

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
        let startDate = $('#startDate').val();
        let endDate = $('#endDate').val();        

        let url = `/api/reports/${startDate}/${endDate}/${studentId}`;
        let response = await fetch(url,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });
        let data = await response.json();

        // add injury reports to the page
        data.injuryReports.forEach(function(ir){
            let row = $("<tr></tr>");
            $(row).append(`<td>${ir.studentName}</td>`);
            $(row).append(`<td>${ir.staffName}</td>`);
            $(row).append(`<td>${ir.date}</td>`);
            $(row).append(`<td>${ir.time}</td>`);
            $(row).append(`<td>${ir.location}</td>`);
            $(row).append(`<td>${ir.bodyPart}</td>`);
            $(row).append(`<td>${ir.how}</td>`);
            $(row).append(`<button val='${ir.incidentId}'>Edit</button>`);
            
            $("#injuryReportTable").append(row);
        });

        // add behavior reports to the page
        data.behaviorReports.forEach(function(br){
            let row = $("<tr></tr>");
            $(row).append(`<td>${br.studentName}</td>`);
            $(row).append(`<td>${br.staffName}</td>`);            
            $(row).append(`<td>${br.date}</td>`);            
            $(row).append(`<td>${br.time}</td>`);
            $(row).append(`<td>${br.location}</td>`);
            $(row).append(`<td>${br.riskBehavior}</td>`);
            $(row).append(`<td>${br.behavior}</td>`);
            $(row).append(`<td>${br.triggers}</td>`);
            $(row).append(`<td>${br.supports}</td>`);
            $(row).append(`<td>${br.recovery}</td>`);
            $(row).append(`<td>${br.supportPlan}</td>`);
            $(row).append(`<button val='${br.incidentId}'>Edit</button>`);
            
            $("#behaviorReportTable").append(row);
        });

    }// showReports

}); // ready