$(document).ready(function() {  
    console.log('Ready to go!');
    $("a").click(function(event) {
        var id = $(this).attr('id');
        console.log(id);
        $.get('http://localhost:5000/getDayOfWeek', { data: id }, function(data) {

        }).done(function(data) {
            $("#meeting-results").replaceWith(data);
        });
        event.preventDefault();
    });
});
