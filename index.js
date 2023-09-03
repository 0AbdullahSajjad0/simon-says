var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var restart = false;

$(document).keydown(function(event){
    if(event.key === 'a' && restart === false && started === false)
    {
        started = true;
        nextSequence();
    }
    
    if(restart === true)
    {
        level = 0;
        gamePattern = [];
        started = true;
        nextSequence();
    }
})


$(".btn").click(function(){
if(started === true)
{        
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    var ans = checkAnswer(userClickedPattern.length-1);

    if(ans === 1)
    {
        console.log("success");
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
    else if(ans === 0) 
    {
        console.log("wrong");
    }
}
});


function nextSequence(){
    level++;    

    $("h1").text("Level " + level);

    userClickedPattern = [];

    var randNum = Math.random() * 4;
    randNum = Math.floor(randNum);

    var randomChosenColour = buttonColours[randNum];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(function(){
        
        playSound(randomChosenColour);

    }).fadeIn();

    
}


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(gamePattern.length === userClickedPattern.length)
        {
            return 1;
        }

    }
    else
    {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        restart = true;
        started = false;
    }

    return -1;
}


 
 
// setTimeout(function(){
//     $("."+randomChosenColour).fadeIn();
// }, 0.5);


