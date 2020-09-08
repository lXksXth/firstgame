var gryb = [];
var score = 100;
var heartOfGame = ["green", "red", "yellow", "blue"];
clicks = [];
iter = 0;

$(document).on("keydown", function(e) {
  if (gryb.length == 0) {
    $("h1").text("SCORE: 100");
    x(Math.floor(Math.random() * 4) + 1, "keyboard");
  }
});

$(".btn").on("click", function(e) {
  if (gryb.length == 0) {
    mouseClick(e.target.classList[1]);
    gameOver();
  } else {
    click = mouseClick(e.target.classList[1]);
    if (click == gryb[iter] && iter <= gryb.length) {
      iter = iter + 1;
      if (iter == gryb.length) {
        levelUp();
        setTimeout(function() {
          x(Math.floor(Math.random() * 4) + 1, "keyboard");
          $("h1").text("SCORE:  " + score);
          iter = 0;
        }, 1000);
      }
    } else {
      gameOver();
    }
  }
});

function x(int, input = "mouse") {
  if (input == "keyboard") {
    opaque(int);
    gryb.push(int);
  } else {
    shadow(int);
    return (int);
  }
}

function audioAdder(int) {
  audio = new Audio("sounds/" + heartOfGame[int - 1] + ".mp3");
  audio.play();
}

function mouseClick(click) {
  for (var i = 0; i < heartOfGame.length; i++) {
    if (heartOfGame[i] == click) {
      return (x(i + 1));
    }
  }
}

function gameOver() {
  jQuery("body").addClass("game-over");
  score = 100;
  gryb = [];
  iter = 0;
  setTimeout(function() {
    jQuery("body").toggleClass("game-over");
    jQuery("h1").text("Game Over, Press Any Key to Restart");
    audio = new Audio("sounds/wrong.mp3");
    audio.play();
  }, 100);
}

function opaque(int) {
  document.querySelector("." + heartOfGame[int - 1]).style.opacity = 0;
  setTimeout(function() {
    document.querySelector("." + heartOfGame[int - 1]).style.opacity = 1;
    audioAdder(int);
  }, 100);
}

function shadow(int) {
  $("." + heartOfGame[int - 1]).addClass("pressed");
  audioAdder(int);
  setTimeout(function() {
    $("." + heartOfGame[int - 1]).removeClass("pressed")
  }, 100);
}

function levelUp() {
  score = Math.ceil(score * 1.5);
}
