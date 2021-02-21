/* global $ */
$(document).ready(function() {

$('#update').hide();

$('#hide').on('click', function(){
    console.log("Hide");
    $('#update').hide();
});

$('#show').on('click', function(){
    console.log("Show");
    $('#update').show();
});

$('.edit').on('click', function(){


    var tr = $(this).closest('tr');
    var id = tr.find('.studentID').text();
    var first = tr.find('.first').text();
    var last = tr.find('.last').text();
    var contact = tr.find('.contact').text();
    var email = tr.find('.email').text();

    $('#update_firstName').val(first);
    $('#update_lastName').val(last);
    $('#update_contact').val(contact);
    $('#update_email').val(email);
    $('#update_studentID').val(id);
    
    console.log("ID" + id);
    
    $('#update').show();
});

$('#cancel').on('click', function(){
    $('#update').hide();
});

}); // ready