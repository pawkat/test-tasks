

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
        var div = document.createElement('div');
        $(div).addClass('right-nav');
        for(i = 0; i < amountOfElements; i++){
            var navItem = document.createElement('span');
            $(navItem).addClass('right-nav_item');
            $(div).append(navItem);
        }
        fullpage.append(div);
    }
    createRightNav(amountOfElements);
    // задаём отступы, чтобы первую секцию было видно полностью
    function fullpagePadding() {
        var padding = nav.outerHeight(true);
        fullpage.css('padding-top', padding)
    }
    fullpagePadding();
    //Позиционирование rightNav
    function rightNavPosition() {
        var rightNav = $('.right-nav');
        var rightNavHeight = rightNav.outerHeight(true);
        var topPos = 'calc(50vh - ' + rightNavHeight + 'px)';
        rightNav.css('top', topPos)
    }
    rightNavPosition();
    // Функция перехода к определенной секции
    function gotoSlide(sectionNumber) {
        var section = $('.section');
        var SectionNum = sectionNumber;
        var sectionIndex = SectionNum - 1;
        var scrollToSection = section[sectionIndex];
        var nav = $('.nav');
        var navHeight = nav.outerHeight(true);
        var scrollTo = $(scrollToSection).position().top - navHeight;
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
            var navItem = $('.nav_item')[index];
            var rightNavItem = $('.right-nav_item')[index];
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
        $('.right-nav_item').removeClass('right-nav_item-active');
        var section = $('.section');
        section.each(function () {
            var nav = $('.nav');
            var navHeight = nav.outerHeight(true);
            var scrollTo = $(this).position().top - navHeight;
            var index = $(this).index() - 1;
            var rightNavItem = $('.right-nav_item')[index];
            var index2 = $(this).index();
            var sectionNext = section[index2];
            var nextSectionTopPos = $(sectionNext).outerHeight(true);
            var maxTop = scrollTo + nextSectionTopPos - 1;
            var indexLast = section.length - 1;
            var sectionLast = $(section[indexLast]);
            var lastPos = sectionLast.position().top - navHeight;
            if (window.pageYOffset >= scrollTo & window.pageYOffset <= maxTop) {
                $(rightNavItem).addClass('right-nav_item-active');
            } else if (sectionNext === undefined & window.pageYOffset <= scrollTo & window.pageYOffset >= lastPos) {
                $(rightNavItem).addClass('right-nav_item-active');
            }
        });
        // rotate активного элемента
        function rotateNav() {
            var rightNavActiveIndex = $('.right-nav_item-active').index();
            var navItem = $('.nav_item');
            navItem.removeClass('nav_item-active');
            var navActive = navItem[rightNavActiveIndex];
            $(navActive).addClass('nav_item-active');
        }
        rotateNav();
    }
    $(window).on('scroll', scrollFunc);

});
