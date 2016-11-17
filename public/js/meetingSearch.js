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

// add event listener to form button
document.getElementById('meeting-form').addEventListener('click', function() {
    var hourText = document.querySelector('#hour-btn').textContent;
    var minText = document.querySelector('#min-btn').textContent;
    var perText = document.querySelector('#period-btn').textContent;
    var time = '';
    if (isNaN(hourText) && isNaN(minText)) {
        console.log('no time submitted');
    } else if (hourText !== 'Hours' && minText !== 'Minutes' && (perText === 'AM' || perText === 'PM')) {
        time = hourText + ':' + minText;
    } else {
        console.log('bad submit');
    }

    var JSONdata = {};
    JSONdata['title'] = document.querySelector('#meetingName').value;
    var checkboxes = document.querySelectorAll('.form-check-input');
    JSONdata['day'] = getCheckedBoxes(checkboxes);
    JSONdata['time'] = time;
    JSONdata['period'] = perText;
    executeSearch(JSONdata)
});

function executeSearch(JSONdata) {
    console.log(JSONdata);
    var request = new XMLHttpRequest();
    request.open('POST', 'MeetingSearch/executeSearch', true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            console.log('Success!');
            var el = document.querySelector("#meeting-search-results");
            el.innerHTML = request.responseText;
        } else {
            // We reached our target server, but it returned an errorlog
            console.log('We reached our target server, but it returned an error');
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log('There was a connection error of some sort');
    };
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send(JSON.stringify(JSONdata));
}

function getCheckedBoxes(checkboxes) {
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        // And stick the checked ones onto an array...
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    return checkboxesChecked;
}

function dropDownValues() {
    $("#hour-dropdown li a").click(function() {
        $("#hour-btn").text($(this).text());
        $("#hour-btn").val($(this).text());
    });

    $("#min-dropdown li a").click(function() {
        $("#min-btn").text($(this).text());
        $("#min-btn").val($(this).text());
    });

    $("#period-dropdown li a").click(function() {
        $("#period-btn").text($(this).text());
        $("#period-btn").val($(this).text());
    });
}

ready(dropDownValues);
