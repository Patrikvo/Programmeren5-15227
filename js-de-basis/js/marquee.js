var scrollDelay = 2000; // Vertraging tot het scrollen begint.
var marqueeSpeed = 1;    // hoe snel scrolled de tekst. hoger = sneller.
var marqueePaused = false;
var timer;

var scrollArea;
var marquee;
var scrollPosition = 0;

var scrolling = function() {
    if (!marqueePaused){
        if (scrollPosition + scrollArea.offsetHeight <= 0){
            scrollPosition = marquee.offsetHeight;
        }
        else{
            scrollPosition -= marqueeSpeed;
        }
        scrollArea.style.top = scrollPosition + "px";
    }
}

var startScrolling = function(){
    // scrollArea en marquee worden pas na de scrollDelay geladen, zodat de DOM zeker geladen is.
    // Als de DOM nog niet geladen is, zijn scrollArea en marquee null en scrollt de lichtkrant niet.
    scrollArea = document.getElementById("scroll-area");
    scrollArea.style.top = 0;
    
    marquee = document.getElementById("marquee");
    
    timer = setInterval(scrolling, 30);
}

var initializeMarquee = function(){
    setTimeout(startScrolling, scrollDelay );
}

// onthoud de gewijzigde snelheid niet.
var pauseMarquee =  function(){
    // door een boolean te gebruiken, wordt de snelheid bewaard tijdens het pauzeren.
    marqueePaused = !marqueePaused;
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
