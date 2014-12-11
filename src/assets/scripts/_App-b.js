/* ---------------------------------------------------------------------
Global JavaScript

Target Browsers: All
Author: Nate Geslin
------------------------------------------------------------------------ */

// Namespace Object
var NERD = NERD || {};

// Pass reference to jQuery and Namespace
(function($, APP) {
    'use strict';

    // DOM Ready Function
/*
    $(function() {
        APP.InstanceCarousel.init();
        APP.CarouselsController.init();
    });
*/

/* -------------------------------------------------------------------------
InstanceCarousel
Author: Nate Geslin
------------------------------------------------------------------------- */
    APP.InstanceCarousel = (function() {
        var InstanceCarousel = function() {
            this.$carousel = null;
        };

        InstanceCarousel.prototype.init = function($elementOrUndefined) {
            /**
            * Flag to indicate whether the module has been enabled
            *
            * @property isEnabled
            * @type {Boolean}
            * @default false
            */
            this.isEnabled = false;
            /**
             * Root element of the Carousel Element
             *
             * @property $element
             * @type {jQuery}
             */
            this.$element = $elementOrUndefined || null;

            /**
            * Current slide index of carousel
            *
            * @property currentSlideIndex
            * @type {Number}
            * @default 0
            */
            this.currentSlideIndex = 0;

            /**
            * Total slides in Carousel
            *
            * @property totalSlideCount
            * @type {Number}
            * @default null
            */
            this.totalSlideCount = null;
            /**
            * Delay time (in miliseconds) between slide changes
            *
            * @property slideIntervalDelay
            * @type {Number}
            * @default 5000
            */
            this.slideIntervalDelay = 5000;

            /**
            * Delay time (in miliseconds) before carousel restarts animation
            * after user exits carouselSlide or carouselThumbItem
            *
            * @property hoverDelay
            * @type {Number}
            * @default 400
            */
            this.hoverDelay = 400;

            /**
            * CSS class name for active carousel thumbnail
            *
            * @property activeThumbnail
            * @type {String}
            * @default 'carouselItemThumb_isActive'
            */
            this.isActiveThumb = 'carouselItemThumb_isActive';


            /**
            * CSS class name for visually hidden elements
            * used to hide elements without using .hide()
            *
            * @property isVisuallyHidden
            * @type {String}
            * @default 'isVisuallyHidden'
            */
            this.isVisuallyHidden = 'isVisuallyHidden';

            /**
            * Aria-hidden string attribute
            *
            * @property ariaHidden
            * @type {String}
            * @default 'aria-hidden'
            */
            this.ariaHidden = 'aria-hidden';

            /**
             *
             *
             * @property
             * @type
             * @default
             */
             this.$carousel = $element;

            return this.setupHandlers()
                            .createChildren()
                            .setupLayout()
                            .render()
                            .redraw();

        };

        InstanceCarousel.prototype.setupHandlers = function() {
//            this.onSlideHoverHandler = $.proxy(this.onSlideHover, this);
//            this.onThumbnailHoverHandler = $.proxy(this.onThumbnailHover, this);

            var slideHoverHandler = $.proxy(this.onSlideHover, this);
            this.$carousel.on('mouseenter', $carouselSlides, slideHoverHandler);

            var thumbnailHoverHandler = $.proxy(this.onThumbnailHover, this);
            this.$carousel.on('mouseenter', $carouselThumbItem, thumbnailHoverHandler);

            return this;
        };

        InstanceCarousel.prototype.createChildren = function() {
            this.$carouselSlides = this.$element.find('.js-carouselSlide');
            this.$carouselThumbnails = this.$element.find('.js-carouselThumbItem');

            return this;
        };

        InstanceCarousel.prototype.setupLayout = function() {
            this.$carousel.forEach($carouselSlides).addClass(this.isVisuallyHidden);
        };

        InstanceCarousel.prototype.render = function() {
            //$('.js-carouselSlide').eq(3).removeClass('isVisuallyHidden');
            //$('.js-carouselThumbItem').eq(3).addClass('carouselThumbItem_isActive');
        };

        InstanceCarousel.prototype.redraw = function() {
            // $('.js-carouselSlide').eq(3).addClass('isVisuallyHidden').fadeIn();
            // $('.js-carouselThumbItem').eq(3).removeClass('carouselThumbItem_isActive');
            // change current slide to next slide
            // if ( hover ) { store previous slide index, change to hovered thumb }
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

        return InstanceCarousel;
    }());

/* -------------------------------------------------------------------------
CarouselsController
Author: Nate Geslin
------------------------------------------------------------------------- */
    APP.CarouselsController = function() {
       CarouselsController.prototype.init = function() {
            var $carousels = $('.js-carouselContainer');

            if ($carousels.length === 0) {
                return;
            }

//// instance.init?        var $carouselSlides = $('.js-carouselSlide');
//// instance.init?        var $carouselThumbnails = $('.js-carouselThumbItem');

            $carousels.each(function() {
                var $this = $(this);
                var mycarousel = new APP.InstanceCarousel();
                mycarousel.init($this);
            });

        };
    };

}(jQuery, NERD));

