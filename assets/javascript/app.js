var tags = ["CATS", "DOGS", "FUNNY"];

function renderButtons(){
	$("#btn-area").empty();
	for (var i=0; i<tags.length; i++) {
		var btn = $("<button>");
		btn.addClass("btn btn-info gif-btn");
		btn.attr("data-name", tags[i]);
		btn.text(tags[i]);
		$("#btn-area").append(btn);
	}
}
renderButtons();

$("#get-btn").on('click', function(event){
	if ( $('#search-term').val().trim() === '') {
		alert('Cannot submit with an empty field.')
	} else {
		event.preventDefault();
		var searchTerm = $("#search-term").val().trim().toUpperCase();
		tags.push(searchTerm);
		renderButtons();
	}
})

$(document).on("click", ".gif-btn", function(){
	var gif = $(this).attr("data-name");
	console.log("button click: " + gif);

	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + gif +"&limit=10&api_key=dc6zaTOxFJmzC"

	$.ajax({
       url: queryUrl,
       method: "GET"
   }).done(function(response) {
   	for (i = 0; i < response.pagination.count; i++) {
	   	var gifDiv = $('<div class="gif-results">');
	   	$('<img>').attr({ // http://api.jquery.com/jQuery/#jQuery2   --"Creating New Elements"
	   		"src": response.data[i].images.fixed_width_still.url ,
	   		"data-still": response.data[i].images.fixed_width_still.url ,
	   		"data-animate": response.data[i].images.fixed_width.url ,
	   		"data-state": "still",
	   		"class": "gif",
	   		"alt": response.data[i].title
	   	}).appendTo(gifDiv);
	   	$(	'<p>TITLE: ' + response.data[i].title + 
	   		'<br>RATING: ' + response.data[i].rating.toUpperCase() + '</p>'
	   	).appendTo(gifDiv);
	   	$("#image-area").append(gifDiv);
   	}
   });
});



	// var searchTerm = '';
	// var quantity = 1;
	// var rating = "g";
	// var apiKey = "dc6zaTOxFJmzC";
	// var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" +
	// 	searchTerm + 
	// 	"&limit=" +
	// 	quantity +
	// 	"&rating=" +
	// 	rating + 
	// 	"&api_key=" +
	// 	apiKey;



/*
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		$("#image-area").
	});
*/


/*
 // Initial array of movies
      var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

	   function displayMovieInfo() {
		   var movie = $(this).attr("data-name");
		   var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          var movieDiv = $("<div class='movie'>");
          var rating = response.Rated;

          var pOne = $("<p>").text("Rating: " + rating);
          movieDiv.append(pOne);

          var released = response.Released;

          var pTwo = $("<p>").text("Released: " + released);
          movieDiv.append(pTwo);

          var plot = response.Plot;

          var pThree = $("<p>").text("Plot: " + plot);
          movieDiv.append(pThree);

          var imgURL = response.Poster;

          var image = $("<img>").attr("src", imgURL);
          movieDiv.append(image);
          $("#movies-view").prepend(movieDiv);
        });

      }

      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < movies.length; i++) {
          var a = $("<button>");
          a.addClass("movie");
          a.attr("data-name", movies[i]);
          a.text(movies[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        movies.push(movie);
        renderButtons();
      });

      $(document).on("click", ".movie", displayMovieInfo);
      renderButtons();

*/

