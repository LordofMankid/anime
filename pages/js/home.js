function initialiseCarousel() {
    var carouselWidth = $('.carousel-inner')[0].scrollWidth;
    var cardWidth = $('.carousel-item').width();
    var scrollPosition = 0;
    var scrollPosition2 = 0;

    var width = window.innerWidth
  
    $('#next-slide').on('click', function () {
      switch(true) {
        case width >= 1024:
          if (scrollPosition < (carouselWidth - (cardWidth * 6))) {
            scrollPosition += (cardWidth + (width/100));
            $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 300);
          }
          break;
        case width >= 768:
          if (scrollPosition < (carouselWidth - (cardWidth * 4))) {
            scrollPosition += (cardWidth + (width/100));
            $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 300);
          }
          break;
        default:
          if (scrollPosition < (carouselWidth - (cardWidth))) {
            scrollPosition += (cardWidth + (width/100));
            $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 300);
          }
          break;
      }
    });
  
    $('#prev-slide').on('click', function () {
      switch(true) {
        case width >= 1024:
          if (scrollPosition > 0) {
            scrollPosition -= (cardWidth + (width/100));
            $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 300);
          }
          break;
        case width >= 768:
          if (scrollPosition > 0) {
            scrollPosition -= (cardWidth + (width/100));
            $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 300);
          }
          break;
        default:
          if (scrollPosition > 0) {
            scrollPosition -= (cardWidth + (width/100));
            $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 300);
          }
          break;
      }
    });
  
    $('#next-slide-2').on('click', function () {
      switch(true) {
        case width >= 1024:
          if (scrollPosition2 < (carouselWidth - (cardWidth * 6))) {
            scrollPosition2 += (cardWidth + (width/100));
            $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 300);
          }
          break;
        case width >= 768:
          if (scrollPosition2 < (carouselWidth - (cardWidth * 4))) {
            scrollPosition2 += (cardWidth + (width/100));
            $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 300);
          }
          break;
        default:
          if (scrollPosition2 < (carouselWidth - (cardWidth))) {
            scrollPosition2 += (cardWidth + (width/100));
            $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 300);
          }
          break;
      }
    });
  
    $('#prev-slide-2').on('click', function () {
      switch(true) {
        case width >= 1024:
          if (scrollPosition2 > 0) {
            scrollPosition2 -= (cardWidth + (width/100));
            $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 300);
          }
          break;
        case width >= 768:
          if (scrollPosition2 > 0) {
            scrollPosition2 -= (cardWidth + (width/100));
            $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 300);
          }
          break;
        default:
          if (scrollPosition2 > 0) {
            scrollPosition2 -= (cardWidth + (width/100));
            $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 300);
          }
          break;
      }
    });
 }




