var express = require("express");
var app = express();
var path = require("path");
var bodyParser=require("body-parser");
var urlencodedParser = bodyParser.urlencoded( { extended: false } );

app.listen(process.env.PORT || 9001, function() {
  console.log("Listening on port 9001... IT'S OVER 9000!!!");
});

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile( path.resolve("public/index.html"));
});

app.post("/calcPost", urlencodedParser, function(req, res){
  x = parseInt(req.body.x); // receives X, Y, and TYPE inputs then parses them into numbers to be read in switch
  y = parseInt(req.body.y);
  type = parseInt(req.body.type);
  var calcNum = returnCalc(x,y,type); // passes X,Y, and TYPE into swtich calculator
  res.send(calcNum.toString()); // returns calculator function to POST req
  res.end();
});

function returnCalc(x,y,type){  // takes the inputs and determines the calc to be done on the inputs received
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

    default: alert("Not a function of this calculator");
  }
  return output.toFixed(2);
}
