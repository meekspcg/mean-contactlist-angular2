var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var postS_COLLECTION = "posts";
const fs = require('fs');

var rawdata = fs.readFileSync('posts.json');  
var rawdata = JSON.parse(rawdata);  

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
var dataDir = __dirname + "/data/";
 

var mongoUser = "heroku_0l1cv6g8";
var mongoAccount = "heroku_0l1cv6g8";

app.use(express.static(distDir));
app.use(express.static(dataDir));
 
var MONGODB_URI = 'mongodb://heroku_0l1cv6g8:heroku_0l1cv6g8@ds229458.mlab.com:29458/heroku_0l1cv6g8';
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    // process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// postS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/posts"
 *    GET: finds all posts
 *    POST: creates a new post
 */

app.get("posts.json", function(req, res) {
  console.log(postS_COLLECTION);
  db.collection(postS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get posts.");
    } else {
      res.status(200).json(docs);
    }
  });
});


// /*  "/api/posts"
//  *    GET: finds all posts
//  *    POST: creates a new post
//  */

// app.get("/api/posts/", function(req, res) {
//   console.log(rawdata);
//   postS_COLLECTION = rawdata;
//   db.collection(postS_COLLECTION).find({}).toArray(function(err, docs) {
//     if (err) {
//       handleError(res, err.message, "Failed to get posts.");
//     } else {
//       console.log(docs);
//       res.status(200).json(docs);
//     }
//   });
// });
  
app.delete("posts.json", function(req, res) {
  db.collection(postS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete post");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});