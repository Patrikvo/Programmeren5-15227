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

var startingSecondsHeight;
var startingMinutesHeight;
var startingSecondsTop;
var startingMinutesTop;

var timer;

var startCountdown = function(){
    if (!isCounting){
        isCounting = true;
        getControls();
        parseTimeFields();
        getInitialGraphicValues();
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
    
    secondsRectangle.style.height = startingSecondsHeight + "px";
    secondsRectangle.style.top = startingSecondsTop + "px";
    
    MinutesRectangle.style.height = startingMinutesHeight + "px";
    MinutesRectangle.style.top = startingMinutesTop + "px";
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
    updateGraphics();
}

var updateStopwatch = function(){
    seconds.value = currentSeconds;
    minutes.value = currentMinutes;
}

var getInitialGraphicValues = function(){
    startingSecondsHeight = secondsRectangle.offsetHeight;
    startingMinutesHeight = MinutesRectangle.offsetHeight;
    startingSecondsTop = secondsRectangle.offsetTop;
    startingMinutesTop = MinutesRectangle.offsetTop;
}


var updateGraphics = function(){
    
    
    if (currentSeconds > 0){
        var secondsRatio = currentSeconds / 60.0;
        var secondsDisplacement = secondsRatio * startingSecondsHeight;
        
        secondsRectangle.style.height = (secondsDisplacement) + "px";
        secondsRectangle.style.top = (startingSecondsTop + startingSecondsHeight- secondsDisplacement)  + "px";
        
    }
    else{
        secondsRectangle.style.height = "0px";
    }
    
    
    if (currentMinutes > 0){
        var minutesRatio = currentMinutes / 60.0;
        var minutesDisplacement = minutesRatio * startingMinutesHeight;
        MinutesRectangle.style.height = (minutesDisplacement) + "px";
        MinutesRectangle.style.top = (startingMinutesTop +startingMinutesHeight- minutesDisplacement) + "px";
    }
    else{
        MinutesRectangle.style.height = "0px";
    }
}