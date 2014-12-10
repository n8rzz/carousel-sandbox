// application.js
'use strict';


var IS_ENABLED = false;

var InstanceCarousel = function() {
    this.init();
};
    InstanceCarousel.prototype.init = function() {
        this.$carouselContainer = $('.js-carouselContainer');
        this.$carouselSlides = $('.js-carouselSlide');
        this.$carouselThumbnails = $('.js-carouselThumbItem');
        this.$startSlide = null;
        this.$startSlideThumb = null;

        this.slideLimit = null;
        this.carouselTimer = 0;
        this.carouselDelay = 5000; //magic number
        this.hoverDelay = 400; //magic number
        this.ariaHidden = 'aria-hidden';
        this.activeThumb = 'active-thumb'; // carousel-thumb_sActive
    };

    InstanceCarousel.prototype.setupLayout = function() {
        // isVisuallyHidden applied to all but $('.js-carouselSlide').first()
    };

   InstanceCarousel.prototype.nextSlide = function() {
        // remove active class from previous slide thumb
        // then hide previous slide

        console.log('next slide');
        // show current slide
        // add active class to current slide thumb
    };

    InstanceCarousel.prototype.updatePos = function() {
        if (IS_ENABLED) {
            InstanceCarousel.nextSlide();
        }
    };

    InstanceCarousel.prototype.runCarousel = function() {
        if (IS_ENABLED) {
            InstanceCarousel.updatePos();
        } else if (IS_ENABLED === false) {
            InstanceCarousel.carouselTimer = setInterval( function() {
                InstanceCarousel.updatePos();
            }, InstanceCarousel.carouselDelay);
        }
    };

    InstanceCarousel.prototype.stopCarousel = function() {
        if (InstanceCarousel.carouselTimer !== 0 ) {
            clearInterval(InstanceCarousel.carouselTimer);
            InstanceCarousel.carouselTimer = 0;
        }
    };

/* ---
*   jQuery start
--- */
$(function() {
    // InstanceCarousel.init();

    //main img hover
    $('.js-carouselContainer').hover(function(){
        //InstanceCarousel.stopCarousel();
        console.log('mouseenter');
    }, function() {
        //   InstanceCarousel.runCarousel();
        console.log('mouseexit');
    });

    //thumbnail hover
    $('.js-carouselThumbContainer').hover(function() { // mouseenter
        //stop animation
        //chg main img to thumbnail img
        //remove active class from original link

        //InstanceCarousel.stopCarousel();
        console.log('thumb container mouseenter');
    }, function() { // mouseexit
        // hide hover slide img
        // fade in original main slide
        // add active class back to original thumbnail
        //restart carousel

        //InstanceCarousel.runCarousel();
        console.log('thumb container mouseexit');
    });

});