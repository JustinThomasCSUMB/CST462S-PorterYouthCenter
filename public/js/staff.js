/* global $ */
$(document).ready(function() {

$('#update').hide();

$('.edit').on('click', function(){


    var tr = $(this).closest('tr');
    var id = tr.find('.staffID').text();
    var first = tr.find('.first').text();
    var last = tr.find('.last').text();
    var email = tr.find('.email').text();
    var userName = tr.find('.userName').text();

    $('#update_firstName').val(first);
    $('#update_lastName').val(last);
    $('#update_userName').val(userName);
    $('#update_email').val(email);
    $('#update_staffID').val(id);
    
    console.log("ID" + id);
    
    $('#update').show();
});

$('#cancel').on('click', function(){
    $('#update').hide();
});

}); // ready