/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  var KEYCODE = {
    "W": 87,
    "S": 83,
    "UP":38,
    "DOWN":40,
  }


  // Game Item Objects
  var ball = factory("#ball");
  var leftPaddle = factory("#lefPaddle");
  var rightPaddle = factory("#rightPaddle");

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keyup', handleKeyUp);    
  $(document).on('keydown', handleKeyDown);           
  $(document).on('keydown', handleKeyDownRight);     
  $(document).on('keyup', handleKeyUpRight);                                   // change 'eventType' to the type of event you want to handle

  ///////////////////////////s/////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {


  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      leftPaddle.speedY = +5;
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = -5;
    }
  }
  function handleKeyDownRight(event) {
    if (event.which === KEY.UP) {
      rightPaddle.speedY = +5;
    }
    if (event.which === KEY.DOWNgit add -A) {
      rightPaddle.speedY = -5;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.W) {
      leftPaddle.speedY = 0;
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 0;
    }
  }
  function handleKeyUpRight(event) {
    if (event.which === KEY.UP) {
      rightPaddle.speedY = 0;
    }
    if (event.which === KEY.DOWN) {
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


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}