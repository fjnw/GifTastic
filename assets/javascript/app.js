var tags = ["CATS", "DOGS", "TRIP"];  // initial array of searchable Gif buttons

// render buttons into #btn-area
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
renderButtons(); // call fucntion for default btns on page load

//==============================//
// get-btn creates button from search term in input field
$("#get-btn").on('click', function(event){
	event.preventDefault();
	// if input field is empty: display alert
	if ( $('#search-term').val().trim() === '') {
		alert('Cannot submit with an empty field.')
	// else, create button
	} else {
		// gets value from input field, sets to upperase, sets tov variable
		var searchTerm = $("#search-term").val().trim().toUpperCase();
		// add alue to array
		tags.push(searchTerm);
		// re-render buttons since new term added to array
		renderButtons();
		// reset input field to empty
		$('#search-term').val('');
	}
});

// reset button
$("#reset-btn").on('click', function(event){
	// re-render buttons from array
	// array was never changed so default buttons will render
	renderButtons();
	// clear image area
	$("#image-area").empty();
})


//==============================//
// onclick -- gif search-term buttons
$(document).on("click", ".gif-btn", function(){
	// clear search area: needed for subsequent clicks
	$("#image-area").empty();
	// set button's data-namme to variable for searching
	var gif = $(this).attr("data-name");
	// API url, with data-name as the search value, limited to 10 results, rated G, w/ public API key
	// API documents: https://developers.giphy.com/docs/
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + gif +"&limit=10&rating=g&api_key=dc6zaTOxFJmzC"

	$.ajax({
       url: queryUrl,
       method: "GET"
   }).done(function(response) {
   	// build div and display image/text for each Gif in JSON response 
   	for (i = 0; i < response.pagination.count; i++) {
   		// create Div container for each gif and related elements
	   	var gifDiv = $('<div class="gif-results">');
	   	// create img, set all needed Gif attributes to this img, then append to new Div 
	   	$('<img>').attr({ // http://api.jquery.com/jQuery/#jQuery2   --"Creating New Elements"
	   		"src": response.data[i].images.fixed_width_still.url ,
	   		"data-still": response.data[i].images.fixed_width_still.url ,
	   		"data-animate": response.data[i].images.fixed_width.url ,
	   		"data-state": "still",
	   		"class": "gif",
	   		"alt": response.data[i].title
	   	 }).appendTo(gifDiv);
	   	// get additional info values from JSON and displays in html
	   	$(	'<p>TITLE: ' + response.data[i].title + 
	   		'<br>RATING: ' + response.data[i].rating.toUpperCase() + '</p>'
	   	).appendTo(gifDiv);
	   	// add new div to image area
	   	$("#image-area").append(gifDiv);
   	}
   });
});

// onclick --  gif image
$(document).on("click", ".gif", function(){
	// get gif img origional state
	var state = $(this).attr("data-state");
	// if origional gif img state is still, then change to aniimate
	if (state === "still") {
		// resets the src (which is displayed) to the value (URL) in data-animate
		$(this).attr("src", $(this).attr("data-animate"));
		// change state to animate for future onclick logic
		$(this).attr("data-state", "animate");
	// if origional gif img state is animated, then change to still
	} else {
		// resets the src (which is displayed) to the value (URL) in data-still
		$(this).attr("src", $(this).attr("data-still"));
		// change state to still for future onclick logic
		$(this).attr("data-state", "still");
	}
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
