$(document).ready(function () {
    class Navigation{
        constructor (config){
        this.elem = $(config);
        this.sections = this.elem.find('.section');
        this.nav = this.elem.find(`.${Navigation.classes.headerNav}`);
        this.time = 1000;
        this.init();
    }
    init(){
            this._createWrapper();
            this._createItem();
            this._fullpagePadding();
            this._rightNavPosition();
            this._rightNavPosition();
            this._scrollCoordinates();
            this._scroll();
    }

    _createWrapper() {
        this.elem.append(`<div class="${Navigation.classes.wrapper}"></div>`)
    }
    get _wrapper(){
        return $(`.${Navigation.classes.wrapper}`);
    }
    _createItem(){
        var self = this;
        this.sections.each(function () {
            $(self._wrapper).append(`<span class='${Navigation.classes.rightNavItem}'></span>`);
        })
    }
    _fullpagePadding(){
        this.elem.css('padding-top', $(this.nav).height());
    }
    _rightNavPosition(){
        this._wrapper.css('top', 'calc(50vh - ' + this._wrapper.height() / 2 + 'px)')
    }
    _scrollCoordinates(){
        var self = this;
        this.sections.each(function () {
            var index = $(this).index() - 1;
            var sectionNumber = $(this).index();
            var navItem = $(`.${Navigation.classes.headerNavItem}`)[index];
            var rightNavItem = $(`.${Navigation.classes.rightNavItem}`)[index];
            $(navItem).on('click', function () {
                self._goToSlide(sectionNumber)
            });
            $(rightNavItem).on('click', function () {
                self._goToSlide(sectionNumber)
            });
        })
    }
    _goToSlide(sectionNumber){
        var time = this.time;
        var scrollToSection = this.sections[sectionNumber - 1];
        var scrollTo = $(scrollToSection).position().top - $(`.${Navigation.classes.headerNav}`).outerHeight(true);

        function beforeScroll() {
            console.log('Начался скролл..');
        }
        beforeScroll();
        $.when($('html, body').animate({scrollTop: scrollTo}, time)).then(function afterScroll() {
            console.log('Вы достигли желаемой секции');
        });

    }
    _scrollFunc(){
        var sections = $(`.${Navigation.classes.sections}`);
        $(`.${Navigation.classes.rightNavItem}`).removeClass(`${Navigation.classes.rightNavActive}`);
        $(sections).each(function () {
            var nav = $(`.${Navigation.classes.headerNav}`);
            var scrollTo = $(this).position().top - $(`.${Navigation.classes.headerNav}`).outerHeight(true);
            var rightNavItem = $(`.${Navigation.classes.rightNavItem}`)[$(this).index() - 1];
            var sectionNext = sections[$(this).index()];
            var maxTop = scrollTo + $(sectionNext).outerHeight(true) - 1;
            var sectionLast = $(sections[sections.length - 1]);
            var lastPos = sectionLast.position().top - nav.outerHeight(true);
            if (window.pageYOffset >= scrollTo & window.pageYOffset <= maxTop) {
                $(rightNavItem).addClass(`${Navigation.classes.rightNavActive}`);
            } else if (sectionNext === undefined & window.pageYOffset <= scrollTo & window.pageYOffset >= lastPos) {
                $(rightNavItem).addClass(`${Navigation.classes.rightNavActive}`);
            }
        });
        function rotateNav(){
            var navItem = $(`.${Navigation.classes.headerNavItem}`);
            var navActive = navItem[$(`.${Navigation.classes.rightNavActive}`).index()];
            navItem.removeClass('nav__item_active');
            $(navActive).addClass('nav__item_active');
        }
        rotateNav();
    }
    _scroll(){
        $(window).on('scroll', this._scrollFunc);
    }
    }
    Navigation.classes = {
        wrapper: 'rightNav',
        rightNavItem: 'rightNav__item',
        headerNavItem: 'nav__item',
        rightNavActive: 'rightNav__item_active',
        headerNav: 'nav',
        sections: 'section'
    };
    new Navigation($('.fullpage'));
});
