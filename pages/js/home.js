function initialiseCarousel() {




  if (window.matchMedia("(min-width:576px)").matches) {
    var carouselWidth = $('.carousel-inner')[0].scrollWidth;
    var cardWidth = $('.carousel-item').width();
    // console.log(cardWidth);
  
    var scrollPosition = 0;
    var scrollPosition2 = 0;
  
    $('#next-slide').on('click', function () {
      if (scrollPosition < (carouselWidth - (cardWidth * 6))) {
        console.log('next');
        scrollPosition += cardWidth;
        $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 300);
      }
    });
  
    $('#prev-slide').on('click', function () {
      if (scrollPosition > 0) {
        console.log('prev');
        scrollPosition -= cardWidth;
        $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 300);
      }
    });
  
    $('#next-slide-2').on('click', function () {
      if (scrollPosition2 < (carouselWidth - (cardWidth * 6))) {
        console.log('next');
        scrollPosition2 += cardWidth;
        $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 300);
      }
    });
  
    $('#prev-slide-2').on('click', function () {
      if (scrollPosition2 > 0) {
        console.log('prev');
        scrollPosition2 -= cardWidth;
        $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 300);
      }
    });
  } else {

  }
 }




