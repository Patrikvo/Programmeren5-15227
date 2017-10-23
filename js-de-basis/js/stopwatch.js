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

// constants
var MaxSeconds = 59;
var MaxMinutes = 59;



var startCountdown = function(){
    if (!isCounting){
        isCounting = true;
        timer = setInterval(doTimestep, 1000);  // 1000ms
    }
}


var resetCountdown = function(){
    clearInterval(timer);
    
	if (isNaN(startingSeconds) || startingSeconds > MaxSeconds) { startingSeconds = MaxSeconds;}
	if (isNaN(startingMinutes) || startingMinutes > MaxMinutes) { startingMinutes = MaxMinutes;}
	
    currentSeconds = startingSeconds;
    currentMinutes = startingMinutes;
    updateStopwatch();
	updateGraphics();	
	
    isCounting = false;
}


var inputMinutesChanged = function() {
	parseTimeFields();
	currentSeconds = startingSeconds;
    currentMinutes = startingMinutes;
	updateGraphics();
}


var inputSecondsChanged = function() {
	inputMinutesChanged();
}






var parseTimeFields = function () {
    startingSeconds = parseInt(seconds.value,10);
    startingMinutes = parseInt(minutes.value, 10);
}

var doTimestep = function() {
    if (currentSeconds >= 1) {currentSeconds--; }
    else  {if (currentMinutes >= 1) { currentMinutes--; currentSeconds = MaxSeconds; } 
    else { reachedZero = true; clearInterval(timer); } }
    updateStopwatch();
    updateGraphics();
}

var updateStopwatch = function(){
    seconds.value = currentSeconds;
    minutes.value = currentMinutes;
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


// Maak de stopwatch klaar voor eerste gebruik.
var initializeStopwatch = function() {
	getControls();
	getInitialGraphicSizes();
	inputMinutesChanged();
}

// Vind de controls (knoppen, tekstvak en div's) in de DOM en plaats de verwijzingen in variabelen.
var getControls = function(){
	
	// rechthoeken die de overgebleven tijd tonen.
    secondsRectangle = document.getElementById("secondsRectangle");
    MinutesRectangle = document.getElementById("MinutesRectangle");
    
	// tekstvelden waarin de seconden en de minuten worden ingevoerd.
    minutes = document.getElementById("minutes");
    seconds = document.getElementById("seconds");
    
	// de knoppen van de stopwatch.
    startButton = document.getElementById("startButton");
    resetButton = document.getElementById("resetButton");
}

// vind de startgrootte van de rechthoeken.
var getInitialGraphicSizes = function(){
    startingSecondsHeight = secondsRectangle.offsetHeight;
    startingMinutesHeight = MinutesRectangle.offsetHeight;
    startingSecondsTop = secondsRectangle.offsetTop;
    startingMinutesTop = MinutesRectangle.offsetTop;
}


window.onload=initializeStopwatch();
