var artists = ["Salvador Dalí", "M.C. Escher", "Hieronymus Bosch", "Andy Warhol", "Jackson Pollock"];

$("button").on("click", function () {
    displayGifs();
});

function displayGifs() {
    $("#gif-view").empty();

    console.log(this);
    var title = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=nFOfNkV39yO99o1hTzNenh1DcMzQS23Q&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {
            var gifDiv = $("<div class='gif'>");

            var imageStill = response.data[i].images.fixed_height_still.url;
            var imageAnimated = response.data[i].images.fixed_height.url;
            var artistGif = $("<img>");
            artistGif.addClass("play");
            artistGif.attr("src", imageStill);
            artistGif.attr("data-url", imageAnimated)
            gifDiv.append(artistGif);
    
            var rating = response.data[i].rating;
            var ratingTag = $("<p>").text("Rating: " + rating);
            gifDiv.prepend(ratingTag);
    
            $("#gif-view").prepend(gifDiv);
        };

    });

};

function renderButtons() {

    $("#buttons").empty();

    for (var i = 0; i < artists.length; i++) {

        var a = $("<button>");
        a.attr("data-name", artists[i]);
        a.addClass("artist-btn btn btn-dark");
        a.text(artists[i]);
        $("#buttons").append(a);
    };
};

$("#submit").on("click", function (event) {
    event.preventDefault();

    var artist = $("#input").val().trim();
    console.log(artist);

    artists.push(artist);

    renderButtons();
});

function toggleAnimate(){

    var source = $(this).attr('src');
    $(this).attr('src', $(this).attr('data-url'));
    $(this).attr('data-url', source);
 }

$(document).on("click", ".artist-btn", displayGifs);

$(document).on('click', '.play', toggleAnimate);

renderButtons();