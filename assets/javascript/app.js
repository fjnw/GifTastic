var tags = ["CATS", "DOGS", "TRIP"];

function renderButtons(){
	$("#btn-area").empty();
	for (var i=0; i<tags.length; i++) {
		var btn = $("<button>");
		btn.addClass("btn btn-info gif-btn");
		btn.attr("data-name", tags[i]);
		btn.text(tags[i]);
		$("#btn-area").append(btn);
	}
};

renderButtons();


//==============================//

$("#get-btn").on('click', function(event){
	if ( $('#search-term').val().trim() === '') {
		alert('Cannot submit with an empty field.')
	} else {
		event.preventDefault();
		var searchTerm = $("#search-term").val().trim().toUpperCase();
		tags.push(searchTerm);
		renderButtons();
		$('#search-term').val('');
	}
})


$("#reset-btn").on('click', function(event){
	renderButtons();
	$("#image-area").empty();
})


//==============================//

$(document).on("click", ".gif-btn", function(){
	$("#image-area").empty();
	var gif = $(this).attr("data-name");
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

$(document).on("click", ".gif", function(){
	var state = $(this).attr("data-state");
	if (state === "still") {
		 $(this).attr("src", $(this).attr("data-animate"));
		 //console.log($(this).attr("data-animate"))
		 $(this).attr("data-state", "animate");
	} else {
		 $(this).attr("src", $(this).attr("data-still"));
		 //console.log($(this).attr("data-still"))
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
