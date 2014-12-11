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

    $(function() {
        APP.CarouselsController.init();
    });


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
            this.$carousel = $elementOrUndefined || null;

            /**
            * Current slide index number
            *
            * @property currentSlideIndex
            * @type {Number}
            * @default 0
            */
            this.currentSlideIndex = 0;

            /**
            * Previous slide index number
            *
            * @property previousSlideIndex
            * @type {Number}
            * @default 0
            */
            this.previousSlideIndex = 0;

            /**
            * Total slides in Carousel
            *
            * @property slideLimit
            * @type {Number}
            * @default null
            */
            this.$slideLimit = null;

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
            * Timer variable for interval, resets when interval is inturrupted
            *
            * @property carouselTimer
            * @type {Numer}
            * @default 0
            */
            this.carouselTimer = 0;

            /**
            * Delay time (in ms) between slide change
            *
            * @property carouselDelay
            * @type {Number}
            * @default 5000
            */
            this.carouselDelay = 5000; //magic number

            /**
            * Selector for first slide image
            *
            * @property startSlide
            * @type {jQuery}
            * @default null
            */
            this.startSlide = null;

            /**
            * Selector for first thumbnail
            *
            * @property startThumbnail
            * @type {jQuery}
            * @default null
            */
            this.startThumbnail = null;

            /**
            * Active thumbnail CSS class
            *
            * @property activeThumb
            * @type {String}
            * @default carousel-thumb_isActive
            */
            this.activeThumb = 'carousel-thumb_isActive';

            this.$carouselSlides = this.$carousel.find('.js-carouselSlide');
            this.$carouselThumbnails = this.$carousel.find('.js-carouselThumbItem');

            console.log('initializing...');

            return this.setupHandlers()
                            .createChildren()
                            .layout()
                            .enable();

        };

        InstanceCarousel.prototype.setupHandlers = function() {
            console.log('setting up handlers');

            this.onSlideHoverHandler = $.proxy(this.onSlideHover, this);
            this.offSlideHoverHandler = $.proxy(this.offSlideHover, this);

            this.$carousel.on('mouseenter', this.$carouselSlides, this.onSlideHoverHandler);
            this.$carousel.on('mouseexit', this.$carouselSlides, this.offSlideHoverHandler);


            this.thumbnailHoverHandler = $.proxy(this.onThumbnailHover, this);
            this.$carouselThumbnails.on('mouseenter', this.$carouselThumbItem, this.thumbnailHoverHandler);

            return this;
        };

        InstanceCarousel.prototype.createChildren = function() {
            this.$slideLimit = this.$carouselThumbnails.length;
            this.currentSlideIndex = this.$carouselSlides.first().index();
            this.startSlide = this.$carouselSlides.eq(this.$currentSlideIndex);
            this.startThumbnail = this.$carouselThumbnails.eq(this.$currentSlideIndex);

            console.log('creating children ');

            return this;
        };

        InstanceCarousel.prototype.layout = function() {
            console.log('setting up content styles, hiding other slides');

            this.$carouselSlides.slice(1).addClass(this.isVisuallyHidden);

            return this;
        };

        InstanceCarousel.prototype.render = function() {
            console.log('rendering...');

            //previous $('.js-carouselSlide').eq(3).removeClass('isVisuallyHidden');
            //next $('.js-carouselThumbItem').eq(3).addClass('carouselThumbItem_isActive');

            return this.redraw();
        };

        InstanceCarousel.prototype.redraw = function() {
            console.log('redrawing...');

            // if enabled contine

            // $('.js-carouselSlide').eq(3).addClass('isVisuallyHidden').fadeIn();
            // $('.js-carouselThumbItem').eq(3).removeClass('carouselThumbItem_isActive');

            // change current slide to next slide
            // if ( hover ) { store previous slide index, change to hovered thumb }

            return this;
        };

        InstanceCarousel.prototype.gotoNextSlide = function () {
            console.log('going to next slide');

             this.currentSlideIndex++;

            if (this.currentSlideIndex > this.currentSlideIndex.length) {
                this.currentSlideIndex = 0;
            }
            //this.$carouselThumbnails.eq(this.currentSlideIndex).addClass('carouselThumbItem_isActive');

            return this;
        };

        InstanceCarousel.prototype.enable = function () {
            if (!this.isEnabled) {
                this.isEnabled = true;

                console.log('enabling...');
                return this;
                //.startTimer();
            }

            return this;
        };

        InstanceCarousel.prototype.disable = function () {
            if (this.isEnabled) {
                this.isEnabled = false;

                console.log('disabling...');
                return this;
            }

            return this;
        };

        InstanceCarousel.prototype.startTimer = function () {
            if (this.isEnabled) {
                this.carouselTimer = setInterval(this.gotoNextSlide(), this.carouselDelay);
                // this.isEnabled = true;
            }
        };

        InstanceCarousel.prototype.stopTimer = function () {
            // this.isEnabled = false;
            if (this.carouselTimer !== 0) {
                clearInterval(this.carouselTimer);
                this.carouselTimer = 0;

                console.log('timer cleared');
            }
        };

        InstanceCarousel.prototype.onSlideHover = function(event) {
            var target = event.type;
            console.log('slide hover ' + target);

            // slide.mouseenter
            return this.disable()
                           .stopTimer();
        };

        InstanceCarousel.prototype.offSlideHover = function (event) {
            var target = event.type;
            console.log('slide hover ' + target);
            // slide.mouseexit
            // isEnabled = true;
            return this.enable()
                           .startTimer();
        };

        InstanceCarousel.prototype.onThumbnailHover = function () {
            console.log('thumbnail hover');
            // slide.mouseenter
            // isEnabled = false;

            // slide.mouseexit
            // isEnabled = true;
        };

        return InstanceCarousel;
    }());

/* -------------------------------------------------------------------------
CarouselsController
Author: Nate Geslin
------------------------------------------------------------------------- */
    APP.CarouselsController = {
       init: function() {
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

            console.log('controller init with a carousel');

        }
    };

}(jQuery, NERD));

