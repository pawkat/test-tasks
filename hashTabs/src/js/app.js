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

function hashTabs(link, sections, showClass, linkActiveClass) {



  link.on('click', function() {
    $(link).removeClass(linkActiveClass);
    $(this).addClass(linkActiveClass);
    var index = $(this).index();
    var section = sections[index];
    sections.removeClass(showClass);
    $(section).addClass(showClass);



    window.location.hash = $(this).attr('href');
    return false;
  });
  setInterval(function page() {
    // var findLink = 'a' + '[href="' + window.location.hash.substr(1, window.location.hash.length) + '"]';
    var hash = window.location.hash.substr(1, window.location.hash.length);
    var findLink ='a' + '[href="' + hash + '"]';
    var link = $(findLink);
    link.parent().children().removeClass(linkActiveClass);
    link.addClass(linkActiveClass);
    var sectionClass = '.' + hash;
    var section = $(sectionClass);
    section.parent().children().removeClass(showClass);
    section.addClass(showClass);
  }, 1000);
}
hashTabs($('.header__link'), $('.block'), 'block_show', 'active');
hashTabs($('.header__link2'), $('.block2'), 'block_show', 'active');



