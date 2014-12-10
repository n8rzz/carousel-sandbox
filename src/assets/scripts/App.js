// application.js
'use strict';

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
var $carouselContainer = $('.js-carouselContainer');
var $carouselSlides = $('.js-carouselSlide');

var $startSlide = null;
var $startSlideThumb = null;

var slideLimit = null;
var carouselTimer = 0;
var carouselDelay = 5000; //magic number
var hoverDelay = 400; //magic number

var ariaHidden = 'aria-hidden';
var activeThumb = 'active-thumb'; // carousel-thumb_sActive


function nextSlide() {
    // remove active class from previous slide thumb
    // then hide previous slide


    // show current slide
    // add active class to current slide thumb
}

function updatePos() {


    nextSlide();
}

function runCarousel() {
    updatePos();
    carouselTimer = setInterval( function() {
        updatePos();
    }, carouselDelay);
}

function stopCarousel() {
    if (carouselTimer !== 0 ) {
        clearInterval(carouselTimer);
        carouselTimer = 0;
    }
}

/* ---
*   jQuery start
--- */

$(function() {
    if (!$carouselContainer) {
        return;
    } else if ($carouselContainer === 0) {
        return;
    } else if ($carouselContainer.length > 0) {
        runCarousel();

        //main img hover
        $carouselSlides.hover(function(){
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