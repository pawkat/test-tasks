$(document).ready(function () {
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
            this._scrollFunc();
            this._resize();
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
        var wrapper = this.elem;
        var time = this.time;
        var scrollToSection = this.sections[sectionNumber - 1];
        var beforeScrollFunc = this.config.beforeScroll;
        var afterScrollFunc = this.config.afterScroll;
        var timer;
        function scroll( before, after) {
            if(!wrapper.hasClass('animation') && scrollToSection){
                var scrollTo = $(scrollToSection).position().top - $(`.${Navigation.classes.headerNav}`).outerHeight(true);
                wrapper.addClass('animation');
                var beforeTimer;
                if (before) {
                    clearTimeout(beforeTimer);
                    beforeTimer = setTimeout(function () {
                        before();
                    }, 10);
                }
                if(after) {
                    var afterTimer;
                    $('html, body').animate({scrollTop: scrollTo}, time, function () {
                        clearTimeout(afterTimer);
                        afterTimer = setTimeout(function () {
                            after();
                            wrapper.removeClass('animation');
                        }, 10);

                    });
                }else{
                    $('html, body').animate({scrollTop: scrollTo}, time, function () {
                        wrapper.removeClass('animation');
                    });
                }
            }
        }
        if(beforeScrollFunc !== undefined && afterScrollFunc !== undefined){
            scroll(beforeScrollFunc, afterScrollFunc);
        }else if(beforeScrollFunc !== undefined) {
            scroll(beforeScrollFunc);
        }else if(!beforeScrollFunc && afterScrollFunc !== undefined) {
            scroll(null, afterScrollFunc);
            // var scrollTo = $(scrollToSection).position().top - $(`.${Navigation.classes.headerNav}`).outerHeight(true);
            // $('html, body').animate({scrollTop: scrollTo}, time, function () {
            //     afterScrollFunc();
            // });
        } else{
            if(wrapper.hasClass('animation') === false && scrollToSection !== undefined){
                var scrollTo = $(scrollToSection).position().top - $(`.${Navigation.classes.headerNav}`).outerHeight(true);
                wrapper.addClass('animation');
                $('html, body').animate({scrollTop: scrollTo}, time, function () {
                    wrapper.removeClass('animation');
                });
            }
        }
    }
    _scrollFunc(){
        var sections = $(`.${Navigation.classes.sections}`);
        sections.removeClass('active');
        $(`.${Navigation.classes.rightNavItem}`).removeClass(`${Navigation.classes.rightNavActive}`);
        $(sections).each(function () {
            var nav = $(`.${Navigation.classes.headerNav}`);
            var scrollTo = $(this).position().top - $(`.${Navigation.classes.headerNav}`).outerHeight(true);
            var rightNavItem = $(`.${Navigation.classes.rightNavItem}`)[$(this).index() - 1];
            var section = $(`.${Navigation.classes.sections}`)[$(this).index() - 1];
            var sectionNext = sections[$(this).index()];
            var maxTop = scrollTo + $(sectionNext).outerHeight(true) - 1;
            var sectionLast = $(sections[sections.length - 1]);
            var lastPos = sectionLast.position().top - nav.outerHeight(true);
            if (window.pageYOffset >= scrollTo & window.pageYOffset <= maxTop) {
                $(rightNavItem).addClass(`${Navigation.classes.rightNavActive}`);
                $(section).addClass('active');
            } else if (sectionNext === undefined & window.pageYOffset <= scrollTo & window.pageYOffset >= lastPos) {
                $(rightNavItem).addClass(`${Navigation.classes.rightNavActive}`);
                $(section).addClass('active');
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
        var func = this._onScroll;
        var self = this;
        $(window).on('scroll', this._scrollFunc);
        $(window).on('mousewheel DOMMouseScroll', function (e) {
            func(e, self);
        });
    }
    _onScroll(e, self){
        var current = $(`.${Navigation.classes.sections}.active`).index();
        if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
            var timer;
            if(e.originalEvent.detail > 0) {
                // console.log('Down');
                self._goToSlide(current + 1);
            } else if(e.originalEvent.detail < 0){
                // console.log('Up');
                self._goToSlide(current - 1);
            }
        } else if (typeof e.originalEvent.wheelDelta == 'number') {
            var timer;
            if(e.originalEvent.wheelDelta < 0) {
                // console.log('Down');
                self._goToSlide(current + 1);
            } else if(e.originalEvent.wheelDelta > 0) {
                // console.log('Up');
                self._goToSlide(current - 1);
            }
        }
    }
    _resize(){
            var self = this;

            $(window).on('resize', function () {
                setTimeout(function () {
                    var activeSection = $(`.${Navigation.classes.sections}.active`).index();
                    self._goToSlide(activeSection)
                }, 500)
            })
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
        beforeScroll: function before() {
            console.log('Cкролл начался');
        },
        // afterScroll: function afterScroll() {
        //     console.log('Вы достигли желаемой секции');
        // },
        rightNav: true,
        topNav: true
    });
});
