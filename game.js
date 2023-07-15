buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;
$(document).keydown(function () {
    if (!started) {
             
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        
    }
});

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAns(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
   $("#level-title").text("Level " + level);
   
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  playSound(randomChosenColour);     
}

function playSound(name) {
           var audio = new Audio("sounds/" + name + ".mp3");
           audio.play();   
      
}
function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    
}

function checkAns(currentLevel) {

      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
        
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
          var wrng = new Audio("sounds/wrong.mp3");
          wrng.play();
          $("body").addClass("game-over");
          setTimeout(() => {
               $("body").removeClass("game-over");
          },200);
          $("#level-title").text("Game Over, Press Any Key to Restart");
          reStart();
      }

}  
function reStart() {
    level = 0;
    started = false;
    gamePattern = [];
}