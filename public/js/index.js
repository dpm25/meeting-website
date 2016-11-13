function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState != 'loading')
                fn();
        });
    }
}

function getHrefText() {
    var el = document.querySelectorAll("#sidebar [href]");
    for (i = 0; i < el.length; i++) {
        el[i].addEventListener('click', function(e) {
            console.log(e.target.getAttribute('id'));
            getDayOfWeek(e.target.getAttribute('id'));
        });
    }
}

function getDayOfWeek(day) {
    var request = new XMLHttpRequest();
    var params = "data=" + day;
    request.open('GET', '/getDayOfWeek?' + params, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var el = document.querySelector("#meeting-results");
            el.outerHTML = request.responseText;
        } else {
            // We reached our target server, but it returned an error
            console.log('We reached our target server, but it returned an error!');
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log('There was a connection error of some sort');
    };
    console.log(request);
    request.send(null);
}

ready(getHrefText);
