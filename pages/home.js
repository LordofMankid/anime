function initialiseCarousel() {
  var carouselWidth = $('.carousel-inner')[0].scrollWidth;
  var cardWidth = $('.carousel-item').width();

  var scrollPosition = 0;
  var scrollPosition2 = 0;

  $('#next-slide').on('click', function () {
    if (scrollPosition < (carouselWidth - (cardWidth * 4))) {
      console.log('next');
      scrollPosition += cardWidth;
      $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 600);
    }
  });

  $('#prev-slide').on('click', function () {
    if (scrollPosition > 0) {
      console.log('prev');
      scrollPosition -= cardWidth;
      $('#carousel-inner').animate({ scrollLeft: scrollPosition }, 600);
    }
  });

  $('#next-slide-2').on('click', function () {
    if (scrollPosition2 < (carouselWidth - (cardWidth * 4))) {
      console.log('next');
      scrollPosition2 += cardWidth;
      $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 600);
    }
  });

  $('#prev-slide-2').on('click', function () {
    if (scrollPosition2 > 0) {
      console.log('prev');
      scrollPosition2 -= cardWidth;
      $('#carousel-inner-2').animate({ scrollLeft: scrollPosition2 }, 600);
    }
  });
}

