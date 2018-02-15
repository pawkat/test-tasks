import sayHello from './lib/sayHello.js';

sayHello();


// var content = $('.content');
// var loader = document.createElement('div');
// $(loader).addClass('loader');
// $('.header__link').on('click', function(e) {
//   var $this = $(this);
//   $('.header__link').removeClass('active');
//   $this.addClass('active');
//   $this.addClass('active');
//   $.ajax({
//     url: $this.attr('href'),
//     dataType: 'html',
//     context: content.html(loader),
//     success: function(html) {
//       loader.remove();
//       this.html(html).fadeIn('fast');
//       console.log(html);
//     }
//   });
//   window.location.hash = $(this).attr('href').substr(0,$(this).attr('href').length-5);
//   e.preventDefault();
//   return false;
// });





function hashTabs(container, linkClass) {
  var container = $(container);
  var link = $(linkClass);
  var loader = document.createElement('div');
  $(loader).addClass('loader');
  $(link).on('click', function() {
    var $this = $(this);
    $(link).removeClass('active');
    $this.addClass('active');
    $.ajax({
      url: $this.attr('href'),
      dataType: 'html',
      context: container.html(loader),
      success: function(html) {
        loader.remove();
        this.html(html).fadeIn('fast');
      }
    });
    window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length - 5);
    return false;
  });
}
hashTabs(($('.content')), ($('.header__link')));
hashTabs(($('.content-2')), ($('.header__link2')));


setInterval(function page() {
  var desiredLinkClass = '.' + window.location.hash.substr(1, 5);
  var desiredLink = $(desiredLinkClass);
  var url = desiredLink.attr('href');
  if (desiredLink.hasClass('active') === false) {
    $('.header-link').removeClass('active');
    desiredLink.addClass('active');
    $.ajax({
      url: url,
      dataType: 'html',
      context: content.html(loader),
      success: function(html) {
        loader.remove();
        this.html(html).fadeIn('fast');
      }
    });
  }
}, 1000);
