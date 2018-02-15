// Run in terminal first:
	// npm install request
	// npm install dotenv
	// npm install twitter
	// npm install node-spotify-api



// Read and set any environment variables with the dotenv package:
require("dotenv").config();
var keys = require("./keys");

// Twitter
// -----------------------------------------------------
var Twitter = require("twitter");
// Import secret keys
var client = new Twitter(keys.twitter);
// Targeting screen name VeryBritishProblems(@SoVeryBritish)
var screenName	= {screen_name: "@SoVeryBritish"};
// twitter function
function tweets() {
	client.get("statuses/home_timeline", "SoVeryBritish", function(error, tweets, response) {
  		if (error) {
			return console.log("Error occured: " + error)
		}
		for (var i = 0; i < tweets.length; i++) {
			console.log("----------------")			
			console.log(tweets[i].user.name + " tweeted:")
			console.log(JSON.stringify((tweets)[i].text, null, 2))
		}
	});
}
// -----------------------------------------------------

// Spotify
// -----------------------------------------------------
var Spotify = require('node-spotify-api');
// Import the keys.js file and store it in a variable
var spotify = new Spotify(keys.spotify);
// spotify function
function spotifyThis() {
	if (process.argv.length > 3) {
		spotify.search({ type: 'track', query: process.argv[3] }, function(error, data) {
  			if (error) {
    			return console.log("Error occurred: " + error);
  			} else {
  				console.log(`${JSON.parse(data).name} by ${JSON.parse(data).artists} on the album ${JSON.parse(data).album.name} \n Preview song here: ${JSON.parse(data).preview_url}`);
  			}
		})
	} else {
		spotify.search({ type: 'track', query: 'ppap' }, function(error, data) {
  			if (error) {
    			return console.log('Error occurred: ' + error);
  			} else {
  				console.log("You asked for it, by not asking for anything. Please enjoy the following:")
  				console.log(`${JSON.stringify(data).name} by ${JSON.stringify(data).artists} on the album ${JSON.stringify(data).album.name} \n Preview song here: ${JSON.stringify(data).preview_url}`);
  			}
		})
	}
};
// -----------------------------------------------------

// OMBD
// -----------------------------------------------------
var request = require("request");
function printMovieData(body) {
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

// omdb function
function movies() {
	if (process.argv.length > 3) {
		// Then run a request to the OMDB API with the movie specified
		request("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
			// If the request is successful (i.e. if the response status code is 200)
			if (!error && response.statusCode === 200) {
				printMovieData(body);
			}
		});		
	} else {
		console.log("I can only assume that you want to know about the greatest movie ever.")
		request("http://www.omdbapi.com/?t=the+room&plot=short&apikey=trilogy", function(error, response, body) {
			if (error) {
				return console.log(`Error occurred: ${error}`)
			} else {
				printMovieData(body);
			}
		})
	}
};
// -----------------------------------------------------

// Do What It Says
// -----------------------------------------------------
// fs is a core Node package for reading and writing files
var fs = require("fs");
// do-what-it-says function
function whatever() {
	// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
	// This block of code will read from the "random.txt" file.
	fs.readFile("random.txt", "utf8", function(error, data) {
		// If the code experiences any errors it will log the error to the console.
		if (error) {
	    	return console.log(error);
		}
		// We know the "random.txt" file is "spotify-this-song, 'I Want it That Way'"
		// Split it by commas to seperate the command from the input
		var doWhat = data.split(",");
		// Set the random command equal to the command to run
		command = doWhat[0];
		// Set the random song to equal the song search
		song = doWhat[1];
	});
	// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
}
// -----------------------------------------------------

var command = process.argv[2];
switch(command){
	case "my-tweets":
		tweets();
		break;
	case "spotify-this-song":
		spotifyThis();
		break;
	case "movie-this":
		movies();
		break;
	case "do-what-it-says":
		whatever();
		break;
}