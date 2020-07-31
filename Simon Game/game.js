var buttonColors=["red","blue","green","yellow"]
var gamePattern=[]
var userClickedPattern=[]
var level=0
var r=0
var started=false
function nextSequence(){
  level++
  randomNumber=Math.floor(Math.random()*4)
  randomChosenColor=buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)
    $('#'+randomChosenColor).fadeOut(300).fadeIn(300);
    $("h1").text("Level "+ level)
    playsound(randomChosenColor)

}
$(document).keydown(function(){
 if(!started)
  {
  started=true
  $("h1").text("Level "+level)
  nextSequence()
}
})
$(".btn").click(function(){
animatePress()

  userChosenColor=$(this).attr("id")
  playsound(userChosenColor)
  animatePress(userChosenColor)
  userClickedPattern.push(userChosenColor)
  if(started)
  {r++
  if(r==level)
  {checkanswer()}
  }
})
function playsound(name)
{
  var audio = new Audio("sounds/" +name + ".mp3");
    audio.play();
}
function animatePress(currentColor){
  $('#'+currentColor).addClass("pressed")
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function checkanswer(){

  if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern))
  { userClickedPattern=[]
    nextSequence()
    r=0
  }
  else{
    userClickedPattern=[]
    gamePattern=[]
    level=0
    r=0
    started=false
    $("h1").text("wrong answer press any key to start again")
    var audio= new Audio("sounds/wrong.mp3")
    audio.play()
    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300)
  }
}
