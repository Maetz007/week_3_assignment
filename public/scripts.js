
$(document).ready(function(){

var calcInput = {
  "x": "",
  "y": "",
  "type": ""
}; // end calcInput object

$(".calcFunc").css("background-color", "#0099FF").on("click", function(){
  calcInput.type = $(this).val();
  calculate();
}); // end calcFunc button call

$("#resetBtn").css("background-color", "#CC7700");

function calculate(){

  calcInput.x = $("#x").val();
  calcInput.y = $("#y").val();

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
  document.getElementById("displayDiv").innerHTML = "";
  document.getElementById("displayDiv").appendChild(newPara);
} // end calcOutput function
}); // end document ready
