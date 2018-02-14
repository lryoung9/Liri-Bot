// Read and set any environment variables with the dotenv package:
require("dotenv").config();

// Twitter fetch
// Run "npm install twitter" in terminal
var Twitter = require("twitter");
var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
// Targeting screen name VeryBritishProblems(@SoVeryBritish)
var screenName	= {screen_name: "@SoVeryBritish"};

// OMBD fetch
// Don't forget to run "npm install request" in this folder first!
var request = require("request");

// Import the keys.js file and store it in a variable
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
switch(command){
	case "my-tweets":
		tweets();
		break;
	case "spotify-this-song":
		spotify();
		break;
	case "movie-this":
		movies();
		break;
	case "do-what-it-says":
		whatever();
		break;
}

// twitter function
function tweets() {
	client.get('statuses/home_timeline', params, function(error, tweets, response) {
  		if (!error) {
			console.log(tweets);
		}
		console.log(JSON.stringify(tweets, null, 2))
	});
}
// spotify function
function spotify() {}

// omdb function
function movies() {
	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {
		    // Parse the body of the site
			// Title of the movie.
			console.log(`Title: ${JSON.parse(body).Title}`)
			console.log("--------------------")
			// Year the movie came out.
			console.log(`Released: ${JSON.parse(body).Year}`)
			// IMDB Rating of the movie.
			console.log(`IMDB rating: ${JSON.parse(body).imdbRating}`)
			// Rotten Tomatoes Rating of the movie.
			console.log(`Rotten Tomatoes rating: ${JSON.parse(body).Ratings[2].Value}`)
			// Country where the movie was produced.
			console.log(`Produced in: ${JSON.parse(body).Country}`)
			// Language of the movie.
			console.log(`Available in: ${JSON.parse(body).Language}`)
			// Plot of the movie.
			console.log(`Plot: \n${JSON.parse(body).Plot}`)
			// Actors in the movie.
			console.log(`Actors: ${JSON.parse(body).Actors}`)
		}
	});
};

// do-what-it-says function
function whatever() {}