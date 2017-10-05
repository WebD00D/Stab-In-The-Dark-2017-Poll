var express = require("express");
var bodyParser = require("body-parser");
var firebase = require("firebase");
var createsend = require('createsend-node');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 8083, function() {
  console.log("Listening on port 8083!");
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyClVUDaals4XX2qCox561okBfZRXDNUZ4o",
  authDomain: "stabinthedark2017.firebaseapp.com",
  databaseURL: "https://stabinthedark2017.firebaseio.com",
  projectId: "stabinthedark2017",
  storageBucket: "stabinthedark2017.appspot.com",
  messagingSenderId: "687257526210"
};
firebase.initializeApp(config);

//Force https in production
if (process.env.NODE_ENV === "production") {
  app.use(function(req, res, next) {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(["https://", req.get("Host"), req.url].join(""));
    }
    return next();
  });
}

app.use("/static/css", express.static(__dirname + "/static/css"));
app.use("/static/scss", express.static(__dirname + "/static/scss"));
app.use("/static/js", express.static(__dirname + "/static/js"));
app.use("/static/img", express.static(__dirname + "/static/img"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/southern-hemi", function(req, res) {
  res.sendFile(__dirname + "/southern-hemi.html");
});

app.get("/shared-list", function(req, res) {
  res.sendFile(__dirname + "/southern-hemi.html");
});

// app.post('*' (res, req) => {
//   console.log('body: ', req.body)
//   console.log('query: ', req.query)
// })

// LOGIC
app.post("/sumbit-email", function(request, res) {
  var email = request.body.email;

  var timeStamp = Date.now();

  var auth = { apiKey: '5ef190df52ba3c10200e220f817661b9' };
  var api = new createsend(auth);

  var listId = '0188d736f819fa4c65f089b35c1ec5dd'
  var details = {
    EmailAddress: email
  };

  api.subscribers.addSubscriber(listId, details, (err, res) => {
    if (err) console.log(err);
  });

  firebase
    .database()
    .ref("readers/" + timeStamp)
    .set({
      email: email
    });

  res.end("successful");
});

app.post("/sumbit-survey", function(request, res) {
  var email = request.body.email;
  var shaper = request.body.shaper;

  var timeStamp = Date.now();

  firebase
    .database()
    .ref("responses/" + shaper + "/" + timeStamp)
    .set({
      email: email,
        social: social
    });



  res.end("successful");
});
