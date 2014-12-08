/* ---------------------------------------------------------------------
Global JavaScript

Target Browsers: All
Author: Nate Geslin
------------------------------------------------------------------------ */

/* -------------------------------------------------------------------------
InstanceCarousel
Author: Nate Geslin


------------------------------------------------------------------------- */
var InstanceCarousel = function() {
    var InstanceCarousel = function() {
        this.$carousel = null;
    };

    InstanceCarousel.prototype.init = function($elem) {
        //define variables

        // instance variable for carousel
        this.$carousel = $elem;
        // initial carousel visibility
        this.setupLayout();
        // bind interactions of carousel
        this.setupHandlers();
    };

    InstanceCarousel.prototype.setupLayout = function() {};
    InstanceCarousel.prototype.setupHandlers = function() {};
    InstanceCarousel.prototype.render = function() {
        //PREVIOUSLY updatePos();


    };
    InstanceCarousel.prototype.redraw = function() {
        // PREVIOUSLY nextSlide();

        // change current slide to next slide
        // if ( hover ) { store previous slide index, change to hovered thumb }
    };

    return InstanceCarousel;
};

/* -------------------------------------------------------------------------
CarouselController
Author: Nate Geslin


------------------------------------------------------------------------- */
var CarouselController = function() {
    CarouselController.prototype.init = function() {


        //return early if there isn't a carousel slide or carousel thumbnail

    };
};