'use strict';

/* ---------------------------------------------------------------------
Global JavaScript

Target Browsers: All
Author: Nate Geslin
------------------------------------------------------------------------ */


/* -------------------------------------------------------------------------
InstanceCarousel
Author: Nate Geslin
------------------------------------------------------------------------- */
var InstanceCarousel = function($elementOrUndefined) {
    this.init($elementOrUndefined);
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
    * Carousel container element
    *
    * @property $carouselContainer
    * @type {jQuery} element
    * @default '.js-carouselContainer'
    */
    this.$carouselContainer = $('.js-carouselContainer');

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
     this.$carousel = this.$element;

    return this.createChildren()
                    .setupHandlers()
                    .setupLayout()
                    .render()
                    .redraw();

};

InstanceCarousel.prototype.createChildren = function() {
    this.$carouselSlides = this.$element.find('.js-carouselSlide');
    this.$carouselThumbnails = this.$element.find('.js-carouselThumbItem');

    return this;
};

InstanceCarousel.prototype.setupHandlers = function() {
    var slideHoverHandler = $.proxy(this.onSlideHover, this);
    this.$carousel.on('mouseenter', this.$carouselSlides, slideHoverHandler);

    var thumbnailHoverHandler = $.proxy(this.onThumbnailHover, this);
    this.$carousel.on('mouseenter', this.$carouselThumbItem, thumbnailHoverHandler);

    return this;
};

InstanceCarousel.prototype.setupLayout = function() {};

InstanceCarousel.prototype.render = function() {};

InstanceCarousel.prototype.redraw = function() {};

InstanceCarousel.prototype.onSlideHover = function () {};

InstanceCarousel.prototype.onThumbnailHover = function () {};


/* -------------------------------------------------------------------------
CarouselsController
Author: Nate Geslin
------------------------------------------------------------------------- */
var CarouselsController = function() {};



$(function() {
//    InstanceCarousel.init();
//    CarouselsController.init();
});
