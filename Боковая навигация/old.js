

$(document).ready(function () {
    console.log('change value of \'var scrollTime\' to change time of scroll');
    console.log('use function gotoSlide(section number) for scrolling to section that you need');
    console.log('You can cancel rotate .nav elements - delete rotateNav function');
    console.log('You can change style of right nav use class right-nav_item and right-nav_item-active');
    console.log('Function that executed before scrolling - beforeScroll');
    console.log('Function that executed after scrolling - afterScroll');
    var fullpage = $('.fullpage');
    var section = $('.section');
    var amountOfElements = section.length;
    var nav = $('.nav');
    var scrollTime = 1000; //ms
    function createRightNav(amountOfElements) {
        fullpage.append("<div class='rightNav'></div>");
        for(i = 0; i < amountOfElements; i++){
            $('.rightNav').append("<span class='rightNav__item'></span>");
        }

    }
    createRightNav(amountOfElements);
    // задаём отступы, чтобы первую секцию было видно полностью
    function fullpagePadding() {
        fullpage.css('padding-top', nav.outerHeight(true));
    }
    fullpagePadding();
    //Позиционирование rightNav
    function rightNavPosition() {
        var rightNav = $('.rightNav');
        var rightNavHeight = rightNav.outerHeight(true);
        rightNav.css('top', 'calc(50vh - ' + rightNavHeight + 'px)')
    }
    rightNavPosition();
    // Функция перехода к определенной секции
    function gotoSlide(sectionNumber) {
        var section = $('.section');
        var scrollToSection = section[sectionNumber - 1];
        var nav = $('.nav');
        var scrollTo = $(scrollToSection).position().top - nav.outerHeight(true);
        // Функция выполняется перед тем, как начался скролл
        function beforeScroll() {
            console.log('Начался скролл..');
        }
        // Функция скролла
        function scroll() {
            $('html, body').animate({scrollTop: scrollTo},scrollTime);
            return false;
        }
        // Функция выполняется после окончания скролла
        setTimeout(function afterScroll() {
            console.log('Вы достигли желаемой секции');
        }, scrollTime);
        beforeScroll();
        scroll();
    }
    // Задаем функцию перехода к нужной секции при клике на <li> в .nav и на <a> в right-nav
    function scrollCoordinates() {
        section.each(function () {
            var index = $(this).index() - 1;
            var sectionNumber = $(this).index();
            var navItem = $('.nav__item')[index];
            var rightNavItem = $('.rightNav__item')[index];
            $(navItem).on('click', function () {
                gotoSlide(sectionNumber)
            });

            $(rightNavItem).on('click', function () {
                gotoSlide(sectionNumber)
            });
        })
    }
    scrollCoordinates();
    // Добавление другого цвета bg активному на данный момент элементу в right-nav
    function scrollFunc() {
        $('.rightNav__item').removeClass('rightNav__item_active');
        var section = $('.section');
        section.each(function () {
            var nav = $('.nav');
            var scrollTo = $(this).position().top - nav.outerHeight(true);
            var rightNavItem = $('.rightNav__item')[$(this).index() - 1];
            var sectionNext = section[$(this).index()];
            var maxTop = scrollTo + $(sectionNext).outerHeight(true) - 1;
            var sectionLast = $(section[section.length - 1]);
            var lastPos = sectionLast.position().top - nav.outerHeight(true);
            if (window.pageYOffset >= scrollTo & window.pageYOffset <= maxTop) {
                $(rightNavItem).addClass('rightNav__item_active');
            } else if (sectionNext === undefined & window.pageYOffset <= scrollTo & window.pageYOffset >= lastPos) {
                $(rightNavItem).addClass('rightNav__item_active');
            }
        });
        // rotate активного элемента
        function rotateNav() {
            var navItem = $('.nav__item');
            var navActive = navItem[$('.rightNav__item_active').index()];
            navItem.removeClass('nav__item_active');
            $(navActive).addClass('nav__item_active');
        }
        rotateNav();
    }
    $(window).on('scroll', scrollFunc);

});
