/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEY = {
    "W": 87,
    "S": 83,
    "UP":38,
    "DOWN":40,
  }
const BOARD_WIDTH = $("#board").width()
const BOARD_HEIGHT = $("#board").height()

  // Game Item Objects
  var ball = factory("#ball");
  var leftPaddle = factory("#leftPaddle");
  var rightPaddle = factory("#rightPaddle");
  var scorePlayer1 = 0
  var scorePlayer2 = 0
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keyup', handleKeyUp);    
  $(document).on('keydown', handleKeyDown);           
  $(document).on('keydown', handleKeyDownRight);     
  $(document).on('keyup', handleKeyUpRight);                                   // change 'eventType' to the type of event you want to handle

  startBall();
  /////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
moveObject(ball);
moveObject(leftPaddle);
moveObject(rightPaddle);
wallCollision(ball);
wallCollision(leftPaddle);
wallCollision(rightPaddle);
doCollide(ball, leftPaddle)
doCollide(ball, rightPaddle)
end();
}


  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.S) {
      leftPaddle.speedY = +5;
    }
    if (event.which === KEY.W) {
      leftPaddle.speedY = -5;
    }
  }
  function handleKeyDownRight(event) {
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = +5;
    }
    if (event.which === KEY.UP) {
      rightPaddle.speedY = -5;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.S) {
      leftPaddle.speedY = 0;
    }
    if (event.which === KEY.W) {
      leftPaddle.speedY = 0;
    }
  }
  function handleKeyUpRight(event) {
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 0;
    }
    if (event.which === KEY.UP) {
      rightPaddle.speedY = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function factory(id) {
    var task = {};
    task.id = id
    task.x = parseFloat($(id).css('left'));
    task.y = parseFloat($(id).css('top'));
    task.width = $(id).width();
    task.height = $(id).height();
    task.speedX = 0;
    task.speedY = 0;
    return task;
  }
function startBall(){
ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
ball.x = 160
ball.y = 160
}
function moveObject(element){
  element.x += element.speedX;
  element.y += element.speedY;
  $(element.id).css("left", element.x);
  $(element.id).css("top", element.y);
}
function wallCollision(detection){
  if (detection.y < 0 || detection.y+detection.height > BOARD_HEIGHT) {
    detection.speedY = -detection.speedY
   } 
   if (detection.x < 0 || detection.x+detection.width > BOARD_WIDTH) {
    detection.speedX = -detection.speedX
   if(detection.x < 0){
    $("#scorePlayer1").text(scorePlayer1 = scorePlayer1 + 1)
    startBall();
   } 
   if (detection.x+detection.width > BOARD_WIDTH){
    $("#scorePlayer2").text(scorePlayer2 = scorePlayer2 + 1)
    startBall();
   }
   } 
}
function doCollide(obj1, obj2) {
  obj1.left = obj1.x;
  obj1.top = obj1.y;
  obj1.right = obj1.x + obj1.width;
  obj1.bottom = obj1.y + obj1.height;
  obj2.left = obj2.x;
  obj2.top = obj2.y;
  obj2.right = obj2.x + obj2.width;
  obj2.bottom = obj2.y + obj2.height
  if (obj1.top < obj2.bottom && obj1.bottom > obj2.top && obj1.right>obj2.left && obj1.left<obj2.right) {
    obj1.speedX = -obj1.speedX
}
}
function end (){
if (scorePlayer1 === 5) {
endGame();
}
if (scorePlayer2 === 5){
  endGame();
}
}
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
