$(document).ready(function(){

var calcInput = {
  "x": x,
  "y": y,
  "z": z
}; // end calcInput object

$("#calcBtn").css("background-color", "#00DD33").on("click", function(){
  calculate();
});

 $("#resetBtn").css("background-color", "#CC3300");

function calculate(){
  calcInput.x = $("#x").val();
  calcInput.y = $("#y").val();
  calcInput.z = $("#z").val();

  $.ajax({
    type: "POST",
    data: calcInput,
    url: "/calcPost",
    success: function(data){
      calcOutput(data);
    },
    error: function(){
      console.log("Oops, ajax broke!");
    }

  }); // end ajax
} // end calculate function

function calcOutput(calcDisplay){
  var newPara = document.createElement("p");
  newPara.textContent = calcDisplay;
  document.getElementById("displayDiv").innerHTML = " ";
  document.getElementById("displayDiv").appendChild(newPara);
} // end calcOutput function
}); // end document ready
