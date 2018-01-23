// WebSocket connection setup
var socket = io();

													// keep count of question, used for IF condition.
var output = document.getElementById('output');				// store id="output" in output variable
output.innerHTML = "<h1 id=response> </h1>";													// ouput first question

function sendMessage() {
    var input = document.getElementById("input").value;
    socket.emit('message',input);
    document.getElementById("input").value="";
}

//push enter key (using jquery), to run bot function.
$(document).keypress(function(e) {
  if (e.which == 13) {
    sendMessage();// run bot function when enter key pressed
  }
});

function changeText(input){
document.getElementById('response').textContent = input;
}

socket.on('answer', function(msg) {
  console.log('Incomming answer:', msg);
  changeText(msg);
});
socket.on('question', function(msg) {
  console.log('Incomming Question:', msg);
  changeText(msg);
});

socket.on('changeBG', function(msg) {
  console.log('Changeing backgroundColor to:', msg);
  document.body.style.backgroundColor = msg;
});

socket.on('changeFont', function(msg) {
  console.log('Changeing Font to:', msg);
  var h1 = document.getElementById('response');
  h1.style.color = 'white';


  //document.body.style.backgroundColor = msg;
});
socket.on('connect',function(){// We let the server know that we are up and running also from the client side;
  socket.emit('loaded');
});
