var isCounting = false;
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

// constanten
var MaxSeconds = 59;
var MaxMinutes = 59;
var timeUntilReset = 1000;
var baseTen = 10;


// start of pauseer de stopwatch.
var startCountdown = function(){
    if (!isCounting){
        // start de stopwatch
        isCounting = true;
        timer = setInterval(doTimestep, 1000);  // 1000ms
        startButton.innerHTML = "Stop";
    }
    else{
        // pauseer de stopwatch
        isCounting = false;
        clearInterval(timer);
        startButton.innerHTML = "Start";
    }
}


// reset de stopwatch. de seconden en minuten worden ingesteld op de laatst ingegeven waarden.
var resetCountdown = function(){
    startButton.innerHTML = "Start";
    clearInterval(timer);
    
	if (isNaN(startingSeconds) || startingSeconds > MaxSeconds) { startingSeconds = MaxSeconds;}
	if (isNaN(startingMinutes) || startingMinutes > MaxMinutes) { startingMinutes = MaxMinutes;}
	
    currentSeconds = startingSeconds;
    currentMinutes = startingMinutes;
    updateStopwatch();
	updateGraphics();	
	
    isCounting = false;
}

// verwerk invoer-event van het tekstveld "minuten"
var inputMinutesChanged = function() {
	parseTimeFields();
	
	currentSeconds = startingSeconds;
    currentMinutes = startingMinutes;
	updateStopwatch();
	updateGraphics();
}

// verwerk invoer-event van het tekstveld "seconden"
var inputSecondsChanged = function() {
	inputMinutesChanged();
}


// zet de tekstuele invoervelden om in geldige integers.
var parseTimeFields = function () {
    startingSeconds = parseInt(seconds.value, baseTen);
    startingMinutes = parseInt(minutes.value, baseTen);
	if (isNaN(startingSeconds) || startingSeconds > MaxSeconds) { startingSeconds = MaxSeconds;}
	if (isNaN(startingMinutes) || startingMinutes > MaxMinutes) { startingMinutes = MaxMinutes;}	
}



// update de seconden- en minutentellers. Wanneer beide nul bereikt hebben, wordt de stopwatch na een korte tijd gereset.
var doTimestep = function() {
    if (currentSeconds >= 1) {
		currentSeconds--; 
	}
    else  {
		if (currentMinutes >= 1) { 
			currentMinutes--; 
			currentSeconds = MaxSeconds; 
		} 
		else { 
			clearInterval(timer);  
			setTimeout(resetCountdown, timeUntilReset);
		} 
	}
	
    updateStopwatch();
    updateGraphics();
}

// update de reserende tijd in de tekstvelden.
var updateStopwatch = function(){
    seconds.value = currentSeconds;
    minutes.value = currentMinutes;
}


// update de hoogte van de resterende tijd-balken.
var updateGraphics = function(){
	var secondsDisplacement = calculateDisplacement(currentSeconds, startingSecondsHeight);
	secondsRectangle.style.height = (secondsDisplacement) + "px";
	secondsRectangle.style.top = (startingSecondsTop + startingSecondsHeight - secondsDisplacement)  + "px";
 
    
	var minutesDisplacement = calculateDisplacement(currentMinutes, startingMinutesHeight);
	MinutesRectangle.style.height = (minutesDisplacement) + "px";
    MinutesRectangle.style.top = (startingMinutesTop +startingMinutesHeight - minutesDisplacement) + "px";
}

// berekend de hoogte van de resterende tijd-balk.
var calculateDisplacement = function(currentValue, maxHeight){
	var displacement = 0;
	if (currentValue > 0){
        var ratio = currentValue / 60.0;
        displacement = ratio * maxHeight;
    }
    return displacement;
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
