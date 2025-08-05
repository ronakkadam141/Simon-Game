alert("WORKING!")

var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
let gameStarted=false;
let level=0;


$(document).keypress(function(){
    if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});


$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour); 

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{
        playSound("wrong");
        $("body").addClass("game-over");
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },150);

        startOver();
    }
}

function nextSequence(){
    level++;
    userClickedPattern=[];

    $("#level-title").text("Level "+level);
    var randomNumber=Math.random()*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColour=buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },50)
}


function playSound(name){
    let mysound= new Audio('sounds/'+name+'.mp3');
    mysound.play();
}


function startOver(){

    level=0;
    gamePattern=[];
    gameStarted=false;
}



