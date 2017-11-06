const scrollDelay = 2000; // Vertraging tot het scrollen begint.
const scrollInterval = 30;

var marqueeSpeed = 1;    // hoe snel scrolled de tekst. hoger = sneller.
const marqueeMaxSpeed = 4; 
const marqueeMinSpeed = 1;

var marqueePaused = false;
var timer;

var scrollArea;
var marquee;
var scrollPosition = 0;

function scrolling() {
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

function startScrolling(){
    // scrollArea en marquee worden pas na de scrollDelay geladen, zodat de DOM zeker geladen is.
    // Als de DOM nog niet geladen is, zijn scrollArea en marquee null en scrollt de lichtkrant niet.

    scrollArea = document.getElementById("scroll-area");
    scrollArea.style.top = 0;

    marquee = document.getElementById("marquee");
    marquee.addEventListener("mouseover", pauseMarquee, false)
    marquee.addEventListener("mouseout", pauseMarquee, false)

    var buttonSpeedUp = document.getElementById("buttonSpeedUp");
    buttonSpeedUp.addEventListener("click", speedUpMarquee, false);

    var buttonSlowDown = document.getElementById("buttonSlowDown");
    buttonSlowDown.addEventListener("click", slowDownMarquee, false);
    
    timer = setInterval(scrolling, scrollInterval);
}

function initializeMarquee() {
    setTimeout(startScrolling, scrollDelay );
}


function pauseMarquee(event){
    // door een boolean te gebruiken, wordt de snelheid bewaard tijdens het pauzeren.
    if (event.type == "mouseover") {
        marqueePaused = true;
    } else {
        marqueePaused = false;
    }
    event.stopPropagation();
}

function speedUpMarquee(event){
    if (marqueeSpeed < marqueeMaxSpeed){
        marqueeSpeed++;
    }
    event.stopPropagation();
}

function slowDownMarquee(event){
    if (marqueeSpeed > marqueeMinSpeed){
        marqueeSpeed--;
    }
    event.stopPropagation();
}

window.onload = initializeMarquee();
