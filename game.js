var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var best = 0;
var started = false;

//detects if a key is pressed and starts game
$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//detects what the user clicks
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      console.log(best, level);
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    best = level;
    $("#best-score").text(best);
    
  }
}

//continues with the sequence
function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  //the random number selects and index from the array, choosing a color
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

//this records the random colors and continues to creates patterns after
//the user clicks while showing the previous entries
 var i = 0;
    var myInterval = setInterval(function() {
      $("#" + gamePattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
      i++;
      if (i== gamePattern.length)
        clearInterval(myInterval);
    }, 500);
}

//resets values after player gets wrong answer in order to start over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//plays sound when button is pressed
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//plays animation when button is pressed
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
