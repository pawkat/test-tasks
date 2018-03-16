$(document).ready(function () {
    console.log('use this syntax for using change slide function "nav._goToSlide(5)"');
    class Navigation{
        constructor (config){
        this.config = config;
        this.elem = config.wrapper;
        this.sections = this.elem.find('.section');
        this.nav = this.elem.find(`.${Navigation.classes.headerNav}`);
        this.time = config.scrollTime;
        this.isRightNav = config.rightNav;
        this.isTopNav = config.topNav;
        this.init();
    }
    init(){
            if(this.isRightNav === true){
                this._createWrapper();
                this._createItem();
                this._rightNavPosition();
            }
            if(this.isTopNav === true){
                this._fullpagePadding();
            }
            this._scrollCoordinates();
            this._scroll();
    }
    _createWrapper() {
        this.elem.append(`<div class="${Navigation.classes.wrapper}"></div>`);
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
        // console.log(this.config.beforeScroll);
        var beforeScrollFunc = this.config.beforeScroll;
        var afterScrollFunc = this.config.afterScroll;
        function scroll( before, after) {
            before(function () {
                $('html, body').animate({scrollTop: scrollTo}, time, function () {
                    after();
                });
            });
        }
        scroll(beforeScrollFunc, afterScrollFunc);
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
    var nav = new Navigation({
        wrapper: $('.fullpage'),
        scrollTime: 1000,
        beforeScroll: function before(callback) {
            console.log('Cкролл начался');
            callback();
        },
        afterScroll: function afterScroll() {
            console.log('Вы достигли желаемой секции');
        },
        rightNav: true,
        topNav: true
    });

});
// before scroll обязательно в таком формате
// beforeScroll: function before(callback) {
//     console.log('скролл начался'); вместо консоль лога пишете свой код
//     callback(); коллбэк обязательно должен вызываться
// }