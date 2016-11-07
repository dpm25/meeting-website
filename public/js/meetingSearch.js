$(function() {
    $(".input-group-btn .dropdown-menu li a").click(function() { 
        var selText = $(this).html();

        //working version - for multiple buttons //
        $(this).parents('.input-group-btn').find('.btn-search').html(selText);

    });

});
