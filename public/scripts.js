
$(document).ready(function(){

// creates a placeholder object to be passed to server
var calcInput = {
  "x": "",
  "y": "",
  "type": ""
}; // end calcInput object

var numArray = []; // array to hold X or Y value
var displayArray = ""; // array to display the combined buttons clicked
var arraySums = ""; // placeholder variable for either X or Y variable
var arrayCounter = 0; // sets counter to reference instances of amount of number button clicks

// when button is clicked, displays clicked number on page
$(".btnNum").css("background-color", "#00FF66").on("click", function(){
  var getNum = $(this).val();
  numArray.push(getNum); // adds a single instance of a number to the number array
  updateNumArrays(); // cleans up number array and creates a number variable
  numOutput(displayArray); // outputs cleaned up array
}); // end numbered button

// determines the type of math to be used on the numbers
$(".calcFunc").css("background-color", "#0099FF").on("click", function(){
  calcInput.x = arraySums; // returns the X number to the object to be POSTed to server
  calcInput.type = $(this).val(); // returns the type of math to the object to be POSTed
  var showSymbol = $(this).attr("id"); // displays the type of math to be used
  numArray.push(showSymbol); // adds the symbol of the calc function used to array for display
  updateNumArrays();
  numOutput(displayArray);
  resetValues(); // resets all variables to the beginning so that we can capture a new, Y variable
}); // end calcFunc button call

// Passes the next number into the Y variable of the object and sends the object to the server
$("#equalBtn").css("background-color", "#FF7F42").on("click", function(){
  calcInput.y = arraySums;
  calculate(); // function call that POSTs to the server
}); // end equals button

// Clears the all the fields and resets the display
$("#reset").css("background-color", "#FF1122").on("click", function(){
  displayArray = "";
  resetValues();
  document.getElementById("numDisplay").innerHTML = "Enter a number..."; // clears numbers from display
  document.getElementById("displayCalc").innerHTML = "<br>Answer is...<br>"; // clears display if answer is present
}); // end reset button

// function call to the server to recieve the X, Y, and Type information then returns the data
function calculate(){
  $.ajax({
    type: "POST",
    data: calcInput, // keys the "data" field to the object
    url: "/calcPost", // location on the server where the POST will be sent
    success: function(dataIn){
      displayCalculation(dataIn); // displays server calculation
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

// displays final calculation from server
function displayCalculation(finalCalc){
  var finalDisplay = document.createElement("div");
  finalDisplay.textContent = finalCalc;
  document.getElementById("displayCalc").innerHTML = "<br>Answer is...<br>";
  document.getElementById("displayCalc").appendChild(finalDisplay);
} // end display calc

// parses arrays into clean, readable numbers while also setting a variable to number to be POSTed later
function updateNumArrays(){
  arraySums = arraySums + numArray[arrayCounter]; // temp array that gets reset after calc chosen
  displayArray = displayArray + numArray[arrayCounter]; // array that holds the total display
  arrayCounter++;
} // end updateNumArrays

// resets all the values to clean up either the number display or X variable content
function resetValues(){
  numArray = [];
  arraySums = "";
  arrayCounter = 0;
} // end reset

}); // end document ready
