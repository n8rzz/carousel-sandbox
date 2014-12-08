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

// Namspace object
var NERD = NERD || {};

// Reference to JQuery and Namespace
(function($, APP) {

    $(function() {
        APP.InstanceCarousel.init();
        APP.CarouselController.init();
    });

    /* -------------------------------------------------------------------------
    InstanceCarousel
    Author: Nate Geslin

    ------------------------------------------------------------------------- */
    APP.InstanceCarousel = (function() {
        // constructor
        var InstanceCarousel = function() {
            this.$carousel = null;
        };

        // inatialize
        InstanceCarousel.prototype.init = function($elem) {
            //define variables
            var $carouselSlides = $('.carouselSlide');
            var $carouselThumbItem = $('.carouselThumbItem');
            var carouselTime = 5000; // magic number for slide show delay
            var hoverDelay = 400; // magic number for hover action delay
            var activeThumb = 'carouselItemThumb_isActive'; // css class for active thumbnail
            var isVisuallyHidden = 'isVisuallyHidden'; // visually hidden utility css class
            var ariaHidden = 'aria-hidden'; // string for aria-hidden attribute


            // instance variable for carousel
            this.$carousel = $elem;
            // initial carousel visibility
            this.setupContentStyles();
            // bind interactions of carousel
            this.bindHandlers();


        };

        InstanceCarousel.prototype.setupContentStyles = function () {
            //visually hide hidden slides
            this.$carousel.forEach($carouselSlides).addClass(isVisuallyHidden);
        };

        InstanceCarousel.prototype.bindHandlers = function() {
            var slideHoverHandler = $.proxy(this.onSlideHover, this);
            this.$carousel.on('mouseenter', $carouselSlides, slideHoverHandler);

            var thumbnailHoverHandler = $.proxy(this.onThumbnailHover, this);
            this.$carousel.on('mouseenter', $carouselThumbItem, thumbnailHoverHandler);
        };

        InstanceCarousel.prototype.onSlideHover = function() {
            // slide.mouseenter
            console.log('slide hover');

            // slide.mouseexit
        };

        InstanceCarousel.prototype.onThumbnailHover = function () {
            // slide.mouseenter
            console.log('thumbnail hover');

            // slide.mouseexit
        };

    }());

    /* -------------------------------------------------------------------------
    CarouselController
    Author: Nate Geslin

    ------------------------------------------------------------------------- */
    APP.CarouselController = (function () {
        CarouselController.prototype.init = function() {
            var $carouselContainer = $('#carousel-container');

            //return early if there isn't a carousel slide or carousel thumbnail
            if ($carouselContainer.length === 0) {
                return;
            }

            $carouselContainer.each(function() {
                var $this = $(this);
                var myCarousel = new App.InstanceCarousel();
                myCarousel.init($this);
            });

        };
    });

}(jQuery, NERD));