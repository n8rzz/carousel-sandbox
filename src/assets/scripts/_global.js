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
var NAT = NAT || {};

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
            if (!$elem) {
                return;
            }
            if ($elem.length === 0) {
                return;
            }

            //define variables
/*
*            var $carouselContainer = $('#carousel-container');
*            var $carouselItem = $('.carousel-item');
*            var $startSlide = '#carousel-item-1'; // $('#carousel-item-1')  // $carouselContainer.first();
*            var $startSlideThumb = '#carousel-item-thumb-1'; //$carouselThumbContainer.first();
*
*            var previous = null;
*            var previousThumb = null;
*            var current = null;
*            var currentThumb = null;
*            var hoverSlide = null;
*            var hoverThumb = null;
*            var carousel = 0;
*            var carouselTime = 5000; //magic number
*            var currentPos = 1; //rewrite to start from 0
*            var slideLimit = $('.carousel-item-thumb li').length;
*
*            var ariaHidden = 'aria-hidden';
*            var activeThumb = 'active-thumb';
*            var hoverDelay = 400; //magic number
            */

            //instance varibale for carousel
            this.$carousel = $elem;
            // initial content styles
            this.setupContentStyles();
            // carousel interactions
            this.bindHandlers();
        };

        InstanceCarousel.prototype.setupContentStyles = function () {
            //visually hide hidden slides
        };

        InstanceCarousel.prototype.bindHandlers = function() {
            //var carouselHoverHandler = $.proxy(this.onSlideHover, this);
            //var onSlideThumbnailHover = $.proxy(this.onSlideThumbnailHover, this);
        };

        InstanceCarousel.prototype.onSlideHover = function() {
            // slide.mouseenter

            // slide.mouseexit
        };

        InstanceCarousel.prototype.onSlideThumbHover = function () {
            // slide.mouseenter

            // slide.mouseexit
        };

    }());

    /* -------------------------------------------------------------------------
    CarouselController
    Author: Natw Geslin

    ------------------------------------------------------------------------- */
    App.CarouselController = {
        init: function() {
            var $carouselSlides = $('.carouselSlide');
            var $carouselThumbItem = $('.carouselThumbItem');

            //return early if there isn't a carousel slide
            if ($carouselSlides.length === 0) {
                return;
            }
            if ($carouselThumbItem.length === 0) {
                return;
            }

            $carouselSlides.each(function() {
                var $this = $(this);
                var myCarousel = new App.InstanceCarousel();
                myCarousel.init($this);
            });

        }
    };

}(JQuery, NAT));