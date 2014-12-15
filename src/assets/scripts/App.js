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
            this.slideIntervalDelay = 2000;

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
            * Active thumbnail CSS class
            *
            * @property activeThumbnailClass
            * @type {String}
            * @default carousel-thumb_isActive
            */
            this.activeThumbnailClass = 'carousel-thumb_isActive';

            this.$carouselSlides = this.$carousel.find('.js-carouselSlide');
            this.$carouselThumbnails = this.$carousel.find('.js-carouselThumbItem');
            this.$currentSlide = null;
            this.$currentThumbnail = null;
            this.$previousSlide = null;
            this.$previousThumbnail = null;

            console.log('initializing...');

            return this.setupHandlers()
                            .createChildren()
                            .layout()
                            .enable();

        };

        InstanceCarousel.prototype.setupHandlers = function() {
            console.log('setting up handlers');

            this.onSlideHoverHandler = $.proxy(this.onSlideHover, this);
            this.$carousel.on('mouseenter', this.$carouselSlides, this.onSlideHoverHandler);
            this.$carousel.on('mouseleave', this.$carouselSlides, this.onSlideHoverHandler);

            this.thumbnailHoverHandler = $.proxy(this.onThumbnailHover, this);
            this.$carouselThumbnails.on('mouseenter', this.$carouselThumbItem, this.thumbnailHoverHandler);
            this.$carouselThumbnails.on('mouseleave', this.$carouselThumbItem, this.thumbnailHoverHandler);

            return this;
        };

        InstanceCarousel.prototype.createChildren = function() {
            this.slideLimit = this.$carouselSlides.length;
            this.$currentSlide = this.$carouselSlides.first();
            this.$currentThumbnail = this.$carouselThumbnails.first();
            this.currentSlideIndex = this.$currentSlide.index();

            console.log('creating children ');
            console.log( 'limit '+ this.slideLimit + ' index ' + this.currentSlideIndex);

            return this;
        };

        InstanceCarousel.prototype.layout = function() {
            console.log('setting up content styles, hiding other slides');

            this.$carouselSlides.slice(1).addClass(this.isVisuallyHidden);

            return this;
        };

        InstanceCarousel.prototype.render = function() {
            console.log('rendering...');

            this.$previousSlide = this.$currentSlide;
            this.$previousThumbnail = this.$currentThumbnail;

            this.$currentSlide = this.$carouselSlides.eq(this.currentSlideIndex);
            this.$currentThumbnail = this.$carouselThumbnails.eq(this.currentSlideIndex);

            return this.redraw();
        };

        InstanceCarousel.prototype.redraw = function() {
            if (!this.isEnabled) {
                console.log('not going to redraw, disabled');
                return this;
            }

            console.log('redrawing...' );
            this.$previousSlide.addClass('isVisuallyHidden');
            this.$previousThumbnail.removeClass('carouselThumbItem_isActive');

            this.$currentSlide.removeClass('isVisuallyHidden');
            this.$currentThumbnail.addClass('carouselThumbItem_isActive');

            return this;
        };

        InstanceCarousel.prototype.gotoNextSlide = function () {
            this.previousSlideIndex = this.currentSlideIndex;
            this.currentSlideIndex++;

            if (this.currentSlideIndex >= this.slideLimit) {
                this.currentSlideIndex = 0;
                console.log('going back to first slide...');
            }

            console.log('going to next slide...' + 'current ' + this.currentSlideIndex + ' previous ' + this.previousSlideIndex);

            return this.render();
        };

        InstanceCarousel.prototype.enable = function () {
            if (!this.isEnabled) {
                this.isEnabled = true;

                console.log('enabling...');
                return this.startTimer();
            }
            return this;
        };

        InstanceCarousel.prototype.disable = function () {
            if (this.isEnabled) {
                this.isEnabled = false;

                console.log('disabling...');
                return this.stopTimer();
            }
            return this;
        };

        InstanceCarousel.prototype.startTimer = function () {
            if (this.isEnabled) {
                this.carouselTimer = setInterval(this.gotoNextSlide.bind(this), this.carouselDelay);
            }
        };

        InstanceCarousel.prototype.stopTimer = function () {
            if (this.carouselTimer !== 0) {
                clearInterval(this.carouselTimer);
                this.carouselTimer = 0;

                console.log('timer cleared');
            }
        };

        // on container mouseenter
        InstanceCarousel.prototype.onSlideHover = function(event) {
            var target = event.type;
            this.currentSlideIndex = this.previousSlideIndex;

            switch  (target) {
                case 'mouseenter':
                    console.log('slide hover ' + target);
                    return this.disable();
                case 'mouseleave':
                    console.log('slide hover ' + target);
                    return this.enable();
                default:
                    break;
                }
        };

        // on thumbnail enter
        InstanceCarousel.prototype.onThumbnailHover = function (event) {
            var target = event.type;

            switch  (target) {
                case 'mouseenter':
                    console.log('thumbnail hover ' + target);
                    // hover target[index] becomes new slide
                    // return this.render();
                    break;
                    // return this.disable()
                case 'mouseleave':
                    console.log('thumbnail hover ' + target);
                    // previous becomes current
                    // return this.render()
                    break;
                default:
                    break;
            }
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

            $carousels.each(function() {
                var $this = $(this);
                var mycarousel = new APP.InstanceCarousel();
                mycarousel.init($this);
            });

            console.log('controller init with a carousel');

        }
    };

}(jQuery, NERD));

