var topics = ["How I Met Your Mother", "Friends", "Game of Thrones", "West World", "Buffy the Vampire Slayer", "Black Mirror", "Parks and Recreation", "The Office", "Community", "It's Always Sunny in Philadelphia", "Agent of Shield", "Modern Family", "Pokemon", "Firefly", "Orphan Black"];

var url="https://api.giphy.com/v1/";
var apiKey="&9pthiJFYkqUtsmNc6fCiSJJPSGr8fD2S&limit=10";
var search="";



// Button creator
function createButton(){
	for (var i=0; i<topics.length; i++){
	var buttonHTML="<button class='button'>"+topics[i]+"</button>"
	$("#buttonHolder").append(buttonHTML);
	}
};

// image creator
// function makeImage(){
// 	 $.ajax({
//           url: queryURL,
//           method: "GET"
//         })
//     .done(function(response) {
//         var results = response.data;
//         // console.log(results);
        
//         for (var i = 0; i < results.length; i++) {
//             if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
//               var rating = results[i].rating;
//               var p = $("<p>").text("Rating: " + rating);
//               var image=$("<img class='resultGif'>");

//               image.attr("src", results[i].images.fixed_height.url);
//               $("#imageHolder").append(image);
//             }
//         }
//      });
// };

$("#buttonHolder").empty();
createButton();


$("#addSearch").on("click", function(event){
	event.preventDefault();
	search = $("#searchInput").val();
	console.log(search);
	topics.push(search);
	createButton();

	var queryURL="https://api.giphy.com/v1/gifs/search?q="+search+"&api_key=dc6zaTOxFJmzC&limit=10";
	makeImage();
});


// Create Images
$(".button").on("click", function(){
	$("#imageHolder").empty();

	search=$(this).html();

	// makeImage();
	var queryURL="https://api.giphy.com/v1/gifs/search?q="+search+"&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
          url: queryURL,
          method: "GET"
        })
    .done(function(response) {
        var results = response.data;
        // console.log(results);
        
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var image=$("<img class='resultGif'>");

              image.attr("src", results[i].images.fixed_height.url);
              $("#imageHolder").append(image);
            }
        }
     });

});


