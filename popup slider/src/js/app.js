import sayHello from './lib/sayHello.js';

sayHello();
var slider = $('.slider');
var tab = $('.tab');
import 'slick-carousel';
slider.slick({
  dots: false,
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 2
});

function tabs() {
  $(slider[0]).addClass('show');
  $(tab[0]).addClass('active');
  tab.on('click', function(e) {
    tab.removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
    slider.removeClass('show');
    $(slider[$(this).data('slider') - 1]).addClass('show');
  });
}
tabs();
$('.btn').on('click', function() {
  var slide = $(this).closest('.slide').data('slide') - 1;
  var wrapper = $('.modalSlide-wrapper');

  $('.modal').fadeIn(800);
  $('.close').click(function() {
    $('.modal').fadeOut(800);
    modalSlider.remove();
  });
  $('.modal__bg').click(function() {
    $('.modal').fadeOut(800);
    modalSlider.remove();
  });
  var slideWrapper = $(this).closest('.slider').find('.slick-slide');
  wrapper.append('<div class="modal__slider"></div>');
  var modalSlider = $('.modal__slider');
  slideWrapper.each(function() {
    if($(this).hasClass('slick-cloned') === false) {
      var slide = $(this).find('.slide');
      var img = $(slide).find('.slide__modal-img').html();
      var content = $(slide).find('.slide__modal-content').html();
      var title = 'Modal ' + $(slide).find('.title').html();
      var date = $(slide).find('.date').html();
      var counter = $(slide).data('slide');
      var counterMax = $(this).parent().parent().parent().data('slides');
      modalSlider.append(`<div class="slide"><div class="modalSlide__content"><h2 class="modalSlide__title">${title}</h2><div class="modalSlide__description">${content}</div><p class="date">${date}</p><div class="counter">${counter}/${counterMax}</div></div>${img}</div>`);
    }
  });
  modalSlider.slick({
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });
  $(modalSlider).slick('slickGoTo', slide);
});
