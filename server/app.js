var express = require("express");
var app = express();
var path = require("path");
var bodyParser=require("body-parser");
var urlencodedParser = bodyParser.urlencoded( { extended: false } );

app.listen(9001, "localhost", function() {
  console.log("Listening on port 9001... IT'S OVER 9000!!!");
});

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile( path.resolve("public/index.html") );
});

app.post("/calcPost", urlencodedParser, function(req, res) {
  x = parseInt(req.body.x);
  y = parseInt(req.body.y);
  type = parseInt(req.body.type);
// console.log("inputs recieved " + x + y + type);
  var calcNum = returnCalc(x,y,type);
  res.send(calcNum.toString());
  res.end();
});

function returnCalc(x,y,type){
  var output = 0;

  switch (type) {

    case 1:
      output = x + y;
      break;

    case 2:
      output = x - y;
      break;

    case 3:
      output = x * y;
      break;

    case 4:
      output = x / y;
      break;

    default: console.log("Not a function of this calculator");
  }
  return Math.round(output);
}
