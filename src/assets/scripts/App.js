// application.js
'use strict';

// Namespace Object
var NERD = NERD || {};

// Pass reference to jQuery and Namespace
(function($, APP) {

    // DOM Ready Function
    $(function() {
        APP.InstanceCarousel.init();
        APP.CarouselsController.init();
    });


    APP.InstanceCarousel = {
        $carousel: null,
        init: function() {
            var $carousels = $('.js-carouselContainer');

            if ($carousels.length === 0) {
                return;
            }

            this.$carousels = $carousels;
            this.isEnabled = false;

            this.createChildren();
            this.setupContentStyles();
            this.setupHandlers();
            this.setupLayout();
            this.render();
            this.redraw();

            console.log('instance initalized');
        },
        createChildren: function() {
            this.$carouselSlides = this.$carousels.find('.js-carouselSlide');
            this.$carouselThumbnails = this.$carousels.find('.js-carouselThumbItem');
            this.slideLimit = this.$carouselThumbnails.length;
            this.carouselTimer = 0;
            this.carouselDelay = 5000; //magic number
            this.hoverDelay = 400; //magic number
            this.isVisuallyHidden = 'isVisuallyHidden';
            this.ariaHidden = 'aria-hidden';
            this.activeThumb = 'active-thumb'; // carousel-thumb_isActive
            this.startSlide = null;
            this.startSlideThumb = null;

            console.log('creating children ' + this.slideLimit);

            return this;
        },
        setupContentStyles: function() {
            this.$carouselSlides.slice(1).hide();

            console.log('setting up content styles, hiding other slides');
        },
        setupHandlers: function() {
            console.log('setting up handlers');

            // carouselContainer hover
            // carouselSlide hover
            // carouselThumbnail hover

            return this;
        },
        setupLayout: function() {
            console.log('setting up layout');

            return this;
        },
        render: function() {
            console.log('rendering...');

            return this;
        },
        redraw: function() {
            console.log('redrawing...');

            return this;
        },
        gotoNextSlide: function() {
            console.log('going to next slide');

            // $('.js-carouselThumbItem').eq(1).addClass('carouselThumbItem_isActive');

            return this.redraw();
        },
        onSlideHover: function() {
            console.log('slide hover');
        },
        onThumbnailHover: function () {
            console.log('thumbnail hover');
        }

    };


    APP.CarouselsController = {
        init: function() {
            var $carousels = $('.js-carouselContainer');

            if ($carousels.length === 0 || !$carousels) {
                return;
            }

            console.log('controller init with a carousel');



        }
    }; //APP.CarouselController

}(jQuery, NERD));