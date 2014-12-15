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

            /**
            * Array containing .js-carouselSlide elements
            *
            * @property $carouselSlides
            * @type {jQuery}
            * @default .js-carouselSlide
            */
            this.$carouselSlides = this.$carousel.find('.js-carouselSlide');

            /**
            * Array containing .js-carouselThumbnail elements
            *
            * @property $carouselThumbnails
            * @type {jQuery}
            * @default .js-carouselThumbItem
            */
            this.$carouselThumbnails = this.$carousel.find('.js-carouselThumbItem');

            /**
            * Current slide selector
            *
            * @property $currentSlide
            * @type {jQuery}
            * @default null
            */
            this.$currentSlide = null;

            /**
            * Current thumbnail selector
            *
            * @property $currentThumbnail
            * @type {jQuery}
            * @default null
            */
            this.$currentThumbnail = null;

            /**
            * Previous slide selector
            *
            * @property $previousSlide
            * @type {jQuery}
            * @default null
            */
            this.$previousSlide = null;

            /**
            * Previous thumbnail selector
            *
            * @property $previousThumbnail
            * @type {jQuery}
            * @default null
            */
            this.$previousThumbnail = null;

            console.log('initializing...');

            return this.setupHandlers()
                            .createChildren()
                            .layout()
                            .enable();

        };

        /**
         * Binds the scope of any handler functions
         * Should only be run on initialization of the view
         *
         * @method setupHandlers
         * @chainable
         */
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

        /**
         * Create any child objects or references to DOM elements
         * Should only be run on initialization of the view
         *
         * @method createChildren
         * @chainable
         */
        InstanceCarousel.prototype.createChildren = function() {
            this.slideLimit = this.$carouselSlides.length;
            this.$currentSlide = this.$carouselSlides.first();
            this.$currentThumbnail = this.$carouselThumbnails.first();
            this.currentSlideIndex = this.$currentSlide.index();

            console.log('creating children ');
            console.log( 'limit '+ this.slideLimit + ' index ' + this.currentSlideIndex);

            return this;
        };

        /**
         * Visually hide all but the first slide element
         * Should only be run on initialization of the view
         *
         * @method layout
         * @chainable
         */
        InstanceCarousel.prototype.layout = function() {
            console.log('setting up content styles, hiding other slides');

            this.$carouselSlides.slice(1).addClass(this.isVisuallyHidden);

            return this;
        };

        /**
         * Prepares the view for redrawing
         * Transfers selectors to new variables
         *
         * @method render
         * @chainable
         */
        InstanceCarousel.prototype.render = function() {
            console.log('rendering...');

            this.$previousSlide = this.$currentSlide;
            this.$previousThumbnail = this.$currentThumbnail;

            this.$currentSlide = this.$carouselSlides.eq(this.currentSlideIndex);
            this.$currentThumbnail = this.$carouselThumbnails.eq(this.currentSlideIndex);

            return this.redraw();
        };

        /**
         * Redraws the view by removing CSS classes to previous slide/thumbnail and adding new ones to the next visible slide/thumbnail
         * Fails if isEnabled === false
         *
         * @method redraw
         * @chainable
         */
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

        /**
         * Updates iterator to the next slide index
         * Returns to first if at the last slide
         *
         * @method gotoNextSlide
         * @chainable
         */
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

        /**
         * Enables the carousel
         * Exits early if already disabled
         *
         * @method enable
         * @chainable
         */
        InstanceCarousel.prototype.enable = function () {
            if (this.isEnabled) {
                return this;
            }

            if (!this.isEnabled) {
                this.isEnabled = true;

                console.log('enabling...');
                return this.startTimer();
            }
            return this;
        };

        /**
         * Disables the carousel
         * Exits early if already disabled
         *
         * @method createChildren
         * @chainable
         */
        InstanceCarousel.prototype.disable = function () {
            if (!this.isEnabled) {
                return this;
            }
            if (this.isEnabled) {
                this.isEnabled = false;

                console.log('disabling...');
                return this.stopTimer();
            }
            return this;
        };

        /**
         * Initiates interval timer
         *
         *
         * @method startTimer
         * @chainable
         */
        InstanceCarousel.prototype.startTimer = function () {
            if (this.isEnabled) {
                this.carouselTimer = setInterval(this.gotoNextSlide.bind(this), this.carouselDelay);
            }
        };

        /**
         * Destroys interval timer
         * Resets carouselTimer variable
         *
         * @method stopTimer
         * @chainable
         */
        InstanceCarousel.prototype.stopTimer = function () {
            if (this.carouselTimer !== 0) {
                clearInterval(this.carouselTimer);
                this.carouselTimer = 0;

                console.log('timer cleared');
            }
        };

        /**
         * onSlideHover Handler method
         * Listens for Hover events on the slide container
         * Disables or Enables carouselTimer based on action
         *
         * @method onSlideHover
         * @param {jQueryEvent} event Hover event
         */
        InstanceCarousel.prototype.onSlideHover = function(event) {
            var target = event.type;

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

        /**
         * onThumbnailHover Handler method
         * Listens for Hover events on slide thumbnails
         * Disables or Enables carouselTimer based on action
         * Caches previousSlideIndex as currentSlideIndex for rendering after hover is finished
         *
         * @method onThumbnailHover
         * @param {jQueryEvent} event Hover event
         */
        InstanceCarousel.prototype.onThumbnailHover = function (event) {
            this.currentSlideIndex = this.previousSlideIndex;
            var target = event.type;

            switch  (target) {
                case 'mouseenter':
                    console.log(this, 'thumbnail ' + target + ', index ' );
                    // hover target[index] becomes new slide
                    // return this.render();
                    break;
                    // return this.disable()
                case 'mouseleave':
                    console.log('thumbnail ' + target);
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

