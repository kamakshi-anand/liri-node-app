require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
//var fs = require("fs");
var keys = require('./keys.js');
console.log("Key is " + keys.spotify);
var spotify = new Spotify(keys.spotify);

function spotifySearch(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (i = 0; i < data.tracks.items.length; i++) {
            var logText;
            logText="The command used is "+query+"\n"+"Album name is " + data.tracks.items[i].album.name+"\n"+
            "Release date is " + data.tracks.items[i].album.release_date+"\n";

            fs.appendFile("log.txt",logText, function(err) {

                // If an error was experienced we will log it.
                if (err) {
                  console.log(err);
                }
              
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                  console.log("Content Added!");
                }
              
              });
            
            console.log("Album name is " + data.tracks.items[i].album.name);
            console.log("Release date is " + data.tracks.items[i].album.release_date);
            console.log("Preview link is " + data.tracks.items[i].preview_url);
            for (j = 0; j < data.tracks.items[i].album.artists.length; j++) {
                console.log("Artist name is " + data.tracks.items[i].album.artists[j].name);
                console.log("*****************************************");
            }
            console.log("*****************************************");

        }
        // console.log("let us see is this works");

    });
}

function movieSearch(movie) {
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";


    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);


    // Then create a request to the queryUrl
    request(queryUrl, function (error, response, body) {
       // console.log(JSON.parse(body));
        // If the request is successful (i.e. if the response status code is 200)
        console.log("Response is"+JSON.parse(body));
        if (!error && response.statusCode === 200) {
            console.log("The movie's title is: " + JSON.parse(body).Title);
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).          
                console.log("The movie's title is: " + JSON.parse(body).Title);
                console.log("Year the movie came out: " + JSON.parse(body).Year);
                console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
                if (JSON.parse(body).Ratings[1] != null) {
                console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
                }
                console.log("Country where the movie was produced: " + JSON.parse(body).Production);
                console.log("Language of the movie: " + JSON.parse(body).Language);
                console.log("Plot of the movie: " + JSON.parse(body).Plot);
                console.log("Actors in the movie: " + JSON.parse(body).Actors);            
        } else {
            console.log("Could not find: " + movie);
        }
    });

}

function twitterSearch(user) {

}
// var client = new Twitter(keys.twitter);
if (process.argv[2] == "spotify-this-song" || process.argv[2] == "do-what-it-says") {

    var song = "";
    if (process.argv[2] == "spotify-this-song") {
        if (!process.argv[3]) {
            song = "The Sign";
        } else {
            song = process.argv.slice(3).join(" ");
        }
        console.log("The song is "+song);
        spotifySearch(song);
    }

    if (process.argv[2] == "do-what-it-says") {
        console.log("In file");
      
        var data = fs.readFileSync("random.txt", "utf8");
        var dataArr = data.split(",");
        if (dataArr[0] == "spotify-this-song") {
            if (!dataArr[1]) {
                song = "The Sign";
            } else {
                song = dataArr[1];
            }
          //  song = dataArr[1];
            spotifySearch(song);
        }
    }
}

if (process.argv[2] == "movie-this" || process.argv[2] == "do-what-it-says") {
    var movie = "";
    if (process.argv[2] == "movie-this") {
        if (!process.argv[3]) {
            movie = "Mr.Nobody";
        } else {
            movie = process.argv.slice(3).join(" ");
        }
        movieSearch(movie);
    }
    if (process.argv[2] == "do-what-it-says") {
        console.log("In file");
       // var fs = require("fs");
        var data = fs.readFileSync("random.txt", "utf8");
        var dataArr = data.split(",");
        if (dataArr[0] == "movie-this") {
            if (!dataArr[1]) {
                movie = "Mr.Nobody";
            } else {
                movie = dataArr[1];
            }
          //  console.log("Movie is" + movie);
            movieSearch(movie);
        }
    }
}

if (process.argv[2] == "my-tweets" || process.argv[2] == "do-what-it-says") {

    //write code
}
