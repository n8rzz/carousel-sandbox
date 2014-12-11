// application.js
/*
init
setupHandlers
createChildren
layout
enable/disable
destroy
render
redraw
*/
var $carouselContainer = $('#js-carousel-container');
var $carouselItem = $('.carousel-item');
var $startSlide = '#carousel-item-1'; // $('#carousel-item-1')  // $carouselContainer.first();
var $startSlideThumb = '#carousel-item-thumb-1'; //$carouselThumbContainer.first();

var previous = null;
var previousThumb = null;
var current = null;
var currentThumb = null;
var hoverSlide = null;
var hoverThumb = null;
var carousel = 0;
var carouselTime = 5000; //magic number
var currentPos = 1; //rewrite to start from 0
var slideLimit = $('.carousel-item-thumb li').length;

var ariaHidden = 'aria-hidden';
var activeThumb = 'active-thumb'; // carousel-thumb_sActive
var hoverDelay = 400; //magic number

function updatePos() {
    //if current == nil, current = start
    if (!current || current == null) {
        previous = $startSlide;
        previousThumb = $startSlideThumb;
        current = $startSlide;
        currentThumb = $startSlideThumb;
        nextSlide();
    }
    //if 1, nextSlide()

    //last pos and new current pos
    previous = current;
    previousThumb = currentThumb;
    current = previous.slice(0, -1) + currentPos;
    currentThumb = previousThumb.slice(0, -1)  + currentPos;

    //++
    currentPos++;

    //if slide.length, back to 1
    if (currentPos == (slideLimit + 1)) {
        currentPos = 1;
    }
    nextSlide();
}

function nextSlide() {
    //remove active class from previous slide thumb, then hide previous slide
    $(previous).delay(hoverDelay).attr(ariaHidden, 'true').hide();
    $(previousThumb).delay(hoverDelay).removeClass(activeThumb);

    //current slide
    //current slide thumb
    $(current).delay(hoverDelay).attr(ariaHidden, 'false').show();
    $(currentThumb).delay(hoverDelay).addClass(activeThumb);
}

function runCarousel() {
    updatePos();
    carousel = this.setInterval( function(){ updatePos(); }, carouselTime);
}
function stopCarousel() {
    if (carousel != 0 ) {
        this.clearInterval(carousel);
        carousel = 0;
    }
}



$(function() {
    if ($carouselContainer.length > 0) {
        runCarousel();

        //main img hover
        $carouselItem.hover(function(){
            stopCarousel();
        }, function() {
            setTimeout( function() { runCarousel(); }, 1000);
        });

        //thumbnail hover
        $('.carousel-item-thumb li').hover(function(){
            //chg main img to thumbnail img
            //remove active class from original link
            var hi = $(this).attr('id');
            var hii = hi.slice(-1);
            var beforeHoverSlideIndex = '#carousel-item-';
            hoverSlide = beforeHoverSlideIndex + hii;
            hoverThumb = '#' + hi;

            //console.log(hi + ' ' + hii);
            //stop animation after short delay
            stopCarousel();

            $(currentThumb).delay(hoverDelay).removeClass(activeThumb);
            $(current).delay(hoverDelay).attr(ariaHidden, 'true').hide();
            $(hoverSlide).delay(hoverDelay).attr(ariaHidden, 'false').show();

        }, function() {
            //hide hover img
            $(hoverSlide).attr(ariaHidden, 'true').delay(hoverDelay).hide();

            //fade in original main
            //add active class back to original thumb
            $(currentThumb).delay(hoverDelay).addClass(activeThumb);
            $(current).delay(hoverDelay).attr(ariaHidden, 'false').show();

            //restart carousel
            runCarousel();
        });
    }
});