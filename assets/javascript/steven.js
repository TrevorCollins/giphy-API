$(document).ready(function () {

    var topics = ['South Park', 'Sons Of Anarchy', 'Ozark', 'Blue Mountain State', 'Breaking Bad', 'The Angry Beavers', 'Shameless', 'Longmire', 'The Office', 'Riverdale'];
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=EV5ZwgHsBpZghKPZvVely9w6rTDn1oOg';

    function createTopics() {
        $(".buttonArea").empty();

        for (var i = 0; i < topics.length; i++) {
            var a = $("<button>");
            a.addClass("gifButton btn btn-lg btn-default btn-block");
            a.attr("data-name", topics[i]);
            a.append(topics[i]);
            $(".buttonArea").append(a);
        }
    };

    function gifDisplay() {
        $('.results').empty();
        $('.results').append('<h2 class="result_title">Now Displaying: <span>' + $(this).data('name') + ' Gifs!</span></h2>');
        // changed this variable name from url to queryURL so it matches the ajax call
        queryURL = queryURL + escape($(this).data('name'));
        console.log(url);

        $.ajax({
            url: queryURL,
            method: "GET"
        // changed this to .then instead of .done
        }).then(function (response) {
            console.log(response);
            var gif = response.data;
            for (var i = 0; i < 12; i++) {

                var gifDiv = $('<div>');
                gifDiv.addClass('gif col-md-4 col-xs-12 col-sm-4');
                gifDiv.append('<img class="gifImg" src=' + gif[i].images.fixed_height_still.url + ' data-still=' + gif[i].images.fixed_height_still.url + ' data-animate=' + gif[i].images.fixed_height.url + ' data-state="still"/>');
                gifDiv.append('<span class="label label-default">Rated: ' + gif[i].rating + '</span>');
                $('.results').append(gifDiv);
            }

            var row = $('div.results > div');
            for (var j = 0; j < row.length; j += 3) {
                row.slice(j, j + 3).wrapAll('<div class="row"></div>');
            }
        });

        // commented this out, I'm not sure if you need it
        // queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=EV5ZwgHsBpZghKPZvVely9w6rTDn1oOg';
    }

    $('.submit').on('click', function (event) {
        event.preventDefault();

        if ($('#userInput').val() != '') {
            var newButton = $('#userInput').val().trim();
            topics.push(newButton);
            createTopics();
        }
        else {
            alert("You didn't enter anything, dum-dum!");
            createTopics();
        }
        $('#userInput').val("");
    });

    $(document).on("click", ".gifButton", gifDisplay);
    $(document).on('click', '.gifImg', function () {
        var state = $(this).data('state')
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).data('state', 'animate');
        }
        if (state === 'animate') {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).data('state', 'still');
        }
    });
    createTopics();
});