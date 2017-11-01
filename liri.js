// LIRI is a Language Interpretation and Recognition Interface - Mhirra Yung NU0814.

// NPM & Module Packages - Require
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer")
var request = require ("request");
var fs = require("fs");
var keys = require("./keys.js");

var twitterClient = new Twitter(keys.twitterKeys);

// var spotifyClient = new Spotify({
//     id: keys.spotifyKeys.client_ID,
//     secret: keys.spotifyKeys.client_Secret,
// });

// Function: Twitter Get Tweets!
function getTweets() {
    var params = { screen_name: 'mhitest', count: 20 };
    twitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("Tweet tweets!:");
            //console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log("Here is a tweet " + [i + 1] + ":");
                console.log(' "' + tweets[i].text + '" ');
                console.log("==============================");
            }
        } else {
            console.log(error);
        }
    });
}

// Function: Spotify Get Song  **HAVING AN ISSUE HERE*
// function getSpotifySongInfo() {
//     var defaultSpotifySong = 'Ace of Base';
//     var query = (process.argv[3] || defaultSpotifySong);

//     spotifyClient.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
//         if (!err) {
//             console.log("Artist: " + data.tracks.items[0].artists[0].name);
//             console.log("Track: " + data.tracks.items[0].name);
//             console.log("Album: " + data.tracks.items[0].name);
//             console.log("Preview URL: " + data.tracks.items[0].preview_url);
//         } else {
//             console.log(err);
//         }
//     });
// }

// Function: OMDB Get Movie
function getMovieInfo() {
    var defaultMovie = 'Mr. Nobody';
    var userMovieSearch = (process.argv[3] || defaultMovie);
    // Request to the OMDB API with userMovieSearch specified
    var queryUrl = "http://www.omdbapi.com/?t=" + userMovieSearch + "&y=&plot=short&apikey=40e9cece";
    console.log(queryUrl);
    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Yr: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        } else {
            console.log(error);
        }
    });
}

// Function: Read Text File
function readTxtFileForCommand() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (!error) {
            console.log(data);
            var fileTextSplitIntoArr = data.split(",");
            console.log(fileTextSplitIntoArr);

            var textFileArg1 = fileTextSplitIntoArr[0];
            var textFileArg2 = fileTextSplitIntoArr[1];
			var query = textFileArg2;
            spotifyClient.search({ type: 'track', query: query, limit: 1 }, function (err, data) {
                if (!err) {
                    console.log("Artist: " + data.tracks.items[0].artists[0].name);
                    console.log("Track: " + data.tracks.items[0].name);
                    console.log("Album: " + data.tracks.items[0].name);
                    console.log("Preview URL: " + data.tracks.items[0].preview_url);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(error);
        }
    });
}

function startApp() {
    // Which API to use and start the LIRI app
    var userSelectsAPI = process.argv[2];

    if (userSelectsAPI === "my-tweets") {
        getTweets();
    } else if (userSelectsAPI === "spotify-this-song") {
        getSpotifySongInfo();
    } else if (userSelectsAPI === "movie-this") {
        getMovieInfo();
    } else if (userSelectsAPI === "do-what-it-says") {
        readTxtFileForCommand();
    } else {
        console.log("Please try again and enter a valid command.");
    }
}

startApp();
