var tags = ["cats", "dogs", "funny"];


function renderButtons(){

	$("#btn-area").empty();

	for (var i=0; i<tags.length; i++) {
		var btn = $("<button>");
		btn.addClass("btn btn-info gif");
		btn.attr("data-name", tags[i]);
		btn.text(tags[i]);
		$("#btn-area").append(btn);
	}
}

renderButtons();












/*
$("#get-giphy").on("click", function() {

      // API URL
      var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

      // AJAX call using url above
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // once the call is done, call the function below, passing in the response
      .done(function(response) {

        // set image URL to a variable
        var imageUrl = response.data.image_original_url;

        // set the image to a variable
        var giphyImage = $("<img>");

        // give the img tag (through catImage) the attributes of the URL source of cat image.
        giphyImage.attr("src", imageUrl);
        // set the alternate text of the image to cat image.
        giphyImage.attr("alt", "cat image");

        // push this new image tag to #images at the beginning
        $("#gif-area").prepend(giphyImage);
      });
    });
*/
