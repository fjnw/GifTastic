var tags = ["CATS", "DOGS", "TRIP"];  // initial array of searchable Gif buttons
var limit = 10;

// render buttons into #btn-area
function renderButtons(){
	$("#btn-area").empty();
	for (var i=0; i<tags.length; i++) {
		var btn = $("<button>");
		btn.addClass("btn btn-outline-info gif-btn");
		btn.attr("data-name", tags[i]);
		btn.attr("offset", 0);
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
	// API url, with data-name as the search value, limited quanitity, rated G, w/ public API key
	// API documents: https://developers.giphy.com/docs/
	var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + gif + 
		"&limit=" + limit + 
		"&offset=" + $(this).attr("offset") + 
		"&rating=g&api_key=dc6zaTOxFJmzC";

	$.ajax({
       url: queryUrl,
       method: "GET"
   }).done(function(response) {
   	// build div and display image/text for each Gif in JSON response 
   	for (i = 0; i < response.pagination.count; i++) {
   		// create Div container for each gif and related elements
	   	var cardDiv = $('<div class="card text-center border-info mb-3" style="width: 20rem;">');
	   	// create img, set all needed Gif attributes to this img, then append to new Div 
	   	// shorthand: http://api.jquery.com/jQuery/#jQuery2  --"Creating New Elements"
	   	$('<img class="card-img-top">').attr({ 
	   		"src": response.data[i].images.fixed_width_still.url ,
	   		"data-still": response.data[i].images.fixed_width_still.url ,
	   		"data-animate": response.data[i].images.fixed_width.url ,
	   		"data-state": "still",
	   		"class": "gif",
	   		"alt": response.data[i].title
	   	 }).appendTo(cardDiv);
	   	// Gif img, additional info, and button link in Bootstrap card
	   	var cardBody = $('<div class="card-body">');
	   	$(	'<h4 class="card-title">' + response.data[i].title + '</h4>' +
	   		'<p class="card-text"><small class="text-muted">rated: ' + 
	   		response.data[i].rating.toUpperCase() + 
	   		'<small></p>'
	   	).appendTo(cardBody);
	   	// adds button with link to card
	   	$( '<a href=' + response.data[i].images.original.url + 
	   		' class="btn btn-info">View Original</a>').appendTo(cardBody);
	   	// appends cardBody to cardDiv
	   	cardDiv.append(cardBody);
	   	// add new div to image area
	   	$("#image-area").append(cardDiv);
   	}
   });
  	// increases offset value in gif-btn by the display limit.
  	// prevents repeat gifs for that search term
  	$(this).attr( "offset", (parseInt($(this).attr("offset")) + limit) );
});

function incrementOffset(offsetValue){
  	console.log($(offsetValue).attr("offset"));
}

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

// makes links <a href> open in new tab vs. defaul in same window
$(document).on('click', 'a', function(e){ 
    e.preventDefault(); 
    var url = $(this).attr('href'); 
    window.open(url, '_blank');
});
