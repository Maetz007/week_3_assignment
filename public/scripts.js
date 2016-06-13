
$(document).ready(function(){

var calcInput = {
  "x": "",
  "y": "",
  "type": ""
}; // end calcInput object

var numArray = [];
var arraySums = "";
var arrayCounter = 0;

// when button is clicked, displays clicked number on page
$(".btnNum").css("background-color", "#00FF66").on("click", function(){
  var getNum = $(this).val();
  numArray.push(getNum);
  removeCommas(); // cleans up number array and creates a number variable
  numOutput(arraySums); // outputs cleaned up array
}); // end numbered button

// determines the type of math to be used on the numbers
$(".calcFunc").css("background-color", "#0099FF").on("click", function(){
  calcInput.x = arraySums; // returns the X number to the object to be POSTed to server
  calcInput.type = $(this).val(); // returns the type of math to the object to be POSTed
  var showSymbol = $(this).attr("id"); // displays the type of math to be used
  removeCommas();
  numOutput(showSymbol);
  numArray = [];        // the next couple of lines here reset all the variables
  arraySums = "";       // and gets ready to take in inputs for the Y variable
  arrayCounter = 0;
}); // end calcFunc button call

// Passes the next number into the Y variable of the object and sends the object to the server
$("#equalBtn").css("background-color", "#FF7F42").on("click", function(){
  calcInput.y = arraySums;
  calculate(); // function call that POSTs to the server
}); // end equals button

// Clears the all the fields and resets the display
$("#reset").css("background-color", "#FF1122").on("click", function(){
  numArray = [];
  arraySums = "";
  arrayCounter = 0;
  document.getElementById("numDisplay").innerHTML = "Enter a number...";
}); // end reset button

// function call to the server to recieve the X, Y, and Type information then returns the data
function calculate(){
  $.ajax({
    type: "POST",
    data: calcInput, // keys the "data" field to the object
    url: "/calcPost", // location on the server where the POST will be sent
    success: function(data){
      numOutput(data); // displays returned number after server has done the "math"
    },
    error: function(){
      console.log("Oops, ajax broke!");
    }
  }); // end ajax
} // end calculate function

// simple display function to output numbers and math types to user
function numOutput(numToDisplay){
  var newNumDisplay = document.createElement("p");
  newNumDisplay.textContent = numToDisplay;
  document.getElementById("numDisplay").innerHTML = "";
  document.getElementById("numDisplay").appendChild(newNumDisplay);
} // end number display

// parses arrays into clean, readable numbers while also setting a variable to number to be POSTed later
function removeCommas(){
  arraySums = arraySums + numArray[arrayCounter];
  arrayCounter++;
} // end clean up of array display to remove commas

}); // end document ready
