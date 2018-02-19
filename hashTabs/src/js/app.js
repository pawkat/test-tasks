import sayHello from './lib/sayHello.js';

sayHello();


// var loader = document.createElement('div');
// $(loader).addClass('loader');
// $.ajax({
//   url: $this.attr('href'),
//   dataType: 'html',
//   context: container.html(loader),
//   success: function(html) {
//     loader.remove();
//     this.html(html).fadeIn('fast');
//   }
// });
function hashContent(link, showClass, linkActiveClass) {
  if(window.location.hash !== '') {
    var hash = window.location.hash.substr(1, window.location.hash.length);
    var link = $('a[href=' + hash + ']');
    link.siblings().removeClass(linkActiveClass);
    link.addClass(linkActiveClass);
    var section = $('.' + hash);
    section.siblings().removeClass(showClass);
    section.addClass(showClass);
  }
}
function hashTabs(link, showClass, linkActiveClass) {
  link.on('click', function() {
    $(this).siblings().removeClass(linkActiveClass);
    $(this).addClass(linkActiveClass);
    var index = $(this).index();
    var content = ('.' + $(this).parent()[0].dataset.content);
    var section = $(content).children()[index];
    $(content).children().removeClass(showClass);
    $(section).addClass(showClass);
    window.location.hash = $(this).attr('href');
    return false;
  });
  $(window).on('hashchange', function() {
    hashContent(link, showClass, linkActiveClass);
  });
  hashContent(link, showClass, linkActiveClass);
}
hashTabs($('.header__link'), 'block_show', 'active');



