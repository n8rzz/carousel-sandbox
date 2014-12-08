function carouselInitialize() {
    //
    var $carouselContainer = $("#carousel-container");
    var $carouselThumbContainer = $(".carousel-item-thumb");
    var $carouselThumbSlides = $carouselThumbContainer.find("li");
    var $startSlide = $carouselContainer.find(".carousel-item").first();
    var $startSlideThumb = $carouselThumbContainer.first();
    var $previousSlide = null;
    var $previousThumb = null;
    var $currentSlide = null;
    var $currentThumb = null;
    var $hoverSlide = null;
    var $hoverThumb = null;

    var carouselTimer = null;
    var carouselTime = 5000;
    var currentPosition = 0;
    var slideLimit = $carouselThumbSlides.length;
}

function updatePosition() {
    if ($currentSlide  === null) {
        $previousSlide = $currentSlide;
        $previousThumb = $currentThumb;
        $currentSlide = $startSlide;
        nextSlide();
    }

    $previousSlide = $currentSlide;
    $previousThumb = $currentThumb;
    $currentSlide = "";
    $currentThumb = "";

    currentPosition++

    if (currentPosition === slideLimit) {
        currentPosition = 0;
    }
    nextSlide();

}

function nextSlide() {

}

function redrawCarousel() {

}

function stopCarousel() {

}


$(function() {
    if (!$carouselContainer) {
        return;
    }
    if ($carouselContainer === 0) {
        return;
    }


});
