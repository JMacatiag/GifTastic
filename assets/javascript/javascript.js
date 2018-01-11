var topics = ["How I Met Your Mother", "Friends", "Game of Thrones", "West World", "Buffy the Vampire Slayer", "Black Mirror", "Parks and Recreation", "The Office", "Community", "It's Always Sunny in Philadelphia", "Agent of Shield", "Modern Family", "Pokemon", "Firefly", "Orphan Black"];

var url="https://api.giphy.com/v1/";
var apiKey="9pthiJFYkqUtsmNc6fCiSJJPSGr8fD2S&limit=10";
var search="";
var queryURL="";

// Button creator
function createButton(){
	$("#buttonHolder").html("");
	for (var i=0; i<topics.length; i++){
	var buttonHTML="<button class='button'>"+topics[i]+"</button>"
	$("#buttonHolder").append(buttonHTML);
	}
};

// image creator
function makeImage(){
	$(".imageArea").empty();
	 $.ajax({
          url: queryURL,
          method: "GET"
        })
    .done(function(response) {
        var results = response.data;
        console.log(results);
 
        
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);
              var image=$("<img class='resultGif'>");
              var image=$("<img class='resultGif' src='' data-still='"+results[i].images.fixed_height_still.url+"' data-animate='"+ results[i].images.fixed_height.url+"'data-state='still'>");
       
              var position=i+3;
              if (position%3===0){
              	image.attr("src", results[i].images.fixed_height_still.url);
             	$("#imageHolderOne").append(image);
             	$("#imageHolderOne").append(p);
              }
              if (position%3===1){
              	image.attr("src", results[i].images.fixed_height_still.url);
             	$("#imageHolderTwo").append(image);
             	$("#imageHolderTwo").append(p);
              }
              if (position%3===2){
              	image.attr("src", results[i].images.fixed_height_still.url);
             	$("#imageHolderThree").append(image);
             	$("#imageHolderThree").append(p);
              }
            }
        }
        animation();
        button();
     });
    return;
};

$("#buttonHolder").empty();
createButton();
button();

$("#addSearch").on("click", function(event){
	event.preventDefault();
	search = $("#searchInput").val();
	console.log(search);
	topics.push(search);
	createButton();
	queryURL="https://api.giphy.com/v1/gifs/search?q="+search+"&api_key="+apiKey;
	makeImage();
	$("#searchInput").val("");
});


// Create Images
function button(){
$(".button").on("click", function(){
	// $("#imageHolder").empty();
	search=$(this).html();
	// makeImage();
	queryURL="https://api.giphy.com/v1/gifs/search?q="+search+"&api_key="+apiKey;
    makeImage();
});
}

// Animation function
function animation(){
	$(".resultGif").on("click", function() {
	console.log(this);
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
}