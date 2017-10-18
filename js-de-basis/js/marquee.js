var scrollDelay = 200; // Vertraging tot het scrollen begint.
var marqueeSpeed = 1;    // hoe snel scrolled de tekst. hoger = sneller.
var timer;

var scrollArea;
var marquee;
var scrollPosition = 0;

var scrolling = function() {
    if (scrollPosition + scrollArea.offsetHeight <= 0){
        scrollPosition = marquee.offsetHeight;
    }
    else{
        scrollPosition -= marqueeSpeed;
    }
    scrollArea.style.top = scrollPosition + "px";
}

var startScrolling = function(){
    
    timer = setInterval(scrolling, 30);
}

var initializeMarquee = function(){
    
    scrollArea = document.getElementById("scroll-area");
    scrollArea.style.top = 0;
    
    marquee = document.getElementById("marquee");
    setTimeout(startScrolling, scrollDelay );
   
}

// onthoud de gewijzigde snelheid niet.
var pauseMarquee =  function(){
    if (marqueeSpeed > 0){
        marqueeSpeed = 0;
    }
    else{
        marqueeSpeed = 1;
    }
}

var speedUpMarquee = function(){
    if (marqueeSpeed <= 3){
        marqueeSpeed++;
    }
}

var slowDownMarquee = function(){
    if (marqueeSpeed > 1){
        marqueeSpeed--;
    }
}

window.onload = initializeMarquee();