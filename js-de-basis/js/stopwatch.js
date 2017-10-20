var isCounting = false;
var reachedZero = false;
var secondsRectangle;
var MinutesRectangle;
var minutes;
var seconds;
var startButton;
var resetButton;

var startingSeconds;
var startingMinutes;

var currentSeconds;
var currentMinutes;

var timer;

var startCountdown = function(){
    if (!isCounting){
        isCounting = true;
        getControls();
        parseTimeFields();
    
        currentSeconds = startingSeconds;
        currentMinutes = startingMinutes;
    
        timer = setInterval(doTimestep, 1000);
    }
}

var resetCountdown = function(){
    clearInterval(timer);
    
    currentSeconds = startingSeconds;
    currentMinutes = startingMinutes;
    updateStopwatch();
    isCounting = false;
}




var getControls = function(){
    secondsRectangle = document.getElementById("secondsRectangle");
    MinutesRectangle = document.getElementById("MinutesRectangle");
    
    minutes = document.getElementById("minutes");
    seconds = document.getElementById("seconds");
    
    startButton = document.getElementById("startButton");
    resetButton = document.getElementById("resetButton");
}

var parseTimeFields = function () {
    startingSeconds = parseInt(seconds.value,10);
    startingMinutes = parseInt(minutes.value, 10);
}

var doTimestep = function() {
    if (currentSeconds >= 1) {currentSeconds--; }
    else  {if (currentMinutes >= 1) { currentMinutes--; currentSeconds = 59; } 
    else { reachedZero = true; clearInterval(timer); } }
    updateStopwatch();
}

var updateStopwatch = function(){
    seconds.value = currentSeconds;
    minutes.value = currentMinutes;
}

// todo: grafische weergave van de tijd.