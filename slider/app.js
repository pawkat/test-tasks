$(document).ready(function () {
    // var url = 'https://jsonplaceholder.typicode.com/photos';
    var loader = document.createElement('div');
    $(loader).addClass('loader');
    function showPopup(slider) {
        $(slider).addClass('js-show-popup ');
    }
    function hidePopup(slider) {
        $(slider).removeClass('js-show-popup ');
    }
    function createSlider(sliderDiv, firstSlide, lastSlide, prevArrowClass, nextArrowClass, thumbnailPrevClass, thumbnailNextClass) {
        var url = $(sliderDiv)[0].dataset.url;
        $.ajax({
            url: url,
            dataType: "json",
            context: sliderDiv.append(loader),
            success: function (html) {
                var sliderClass = $(sliderDiv)[0].className;
                var firstNumber = firstSlide - 1;
                var lastNumber = lastSlide - 1;
                    function createAlbum(sliderDiv) {
                        var slider = $(sliderDiv);
                        var sliderClass = $(sliderDiv)[0].className; /// все названия в зависимости от этого класса
                        var slideContainer = document.createElement('div');
                        var containerClass = sliderClass + '__slides';
                        $(slideContainer).addClass(containerClass);
                        var sliderNav = document.createElement('div');
                        var navClass = sliderClass + '__nav';
                        $(sliderNav).addClass(navClass);
                        for (i = firstNumber; i <= lastNumber; i++) {
                            //big images
                            var slide = document.createElement('div');
                            var slideClass = sliderClass + '__slide';
                            $(slide).addClass(slideClass);
                            var img = document.createElement('img');
                            $(img).attr('src', html[i].url);
                            $(img).attr('alt', html[i].title);
                            slide.append(img);
                            slideContainer.append(slide);
                            // small images
                            var smallSlide = document.createElement('div');
                            var smallSlideClass = sliderClass + '__thumbnails';
                            $(smallSlide).addClass(smallSlideClass);
                            var imgsmall = document.createElement('img');
                            $(imgsmall).attr('src', html[i].thumbnailUrl);
                            $(imgsmall).attr('alt', html[i].title);
                            smallSlide.append(imgsmall);
                            sliderNav.append(smallSlide);
                        }
                        slider.append(slideContainer);
                        slider.append(sliderNav);
                    }
                createAlbum(sliderDiv);
                var sliderContainerClass = '.' + sliderClass + '__slides';
                var sliderContainer = ($(sliderContainerClass)[0]);
                $(sliderContainer).slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    prevArrow: prevArrowClass,
                    nextArrow: nextArrowClass
                });
                var sliderNavClass = '.' + sliderClass + '__nav';
                var sliderNav = ($(sliderNavClass)[0]);
                $(sliderNav).slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: sliderContainerClass,
                    focusOnSelect: true,
                    prevArrow: thumbnailPrevClass,
                    nextArrow: thumbnailNextClass
                });
                loader.remove();

                // функция отображения и закрытия модального окна
                var bigimgClass = '.' + sliderClass + '__slide';
                var bigimg = $(bigimgClass);
                $(bigimg).on('click', function () {
                    // console.log($(this)[0]); //slide
                    var findSlider = '.' + sliderClass;
                    var slider = $(this).closest(findSlider); //slider
                    var arrow = $('.slick-arrow');
                    var className = (($(this)[0]).className).substr(0, ($(this)[0]).className.length - 39);
                    var imgSearch = '.' + className + ' img';
                    var img = $(imgSearch);
                    var slickList = $(this).closest('.slick-list');
                    var slide = $(this);
                    var sliderNavClass = '.' + sliderClass + '__nav';
                    var nav = slider.children(sliderNavClass);
                    var thumbPrev = $(thumbnailPrevClass);
                    var thumbNext = $(thumbnailNextClass);
                    var prevArrow = $(prevArrowClass);
                    var nextArrow = $(nextArrowClass);
                    // Добавление классов для работы popup
                    $(slickList).addClass('popup__size'); //slick-list
                    $(slide).addClass('popup__size_im'); //slide
                    $(img).addClass('popup__size'); //img
                    $(prevArrow).addClass('popup__arrow');
                    $(nextArrow).addClass('popup__arrow');
                    $(nav).addClass('hide'); // nav
                    $(thumbPrev).addClass('hide');
                    $(thumbNext).addClass('hide');

                    showPopup(slider);

                    $('.js-show-popup ').on('click', function (e) {
                        var img = $('img');
                        if (!img.is(e.target) // если клик был не по нашему блоку
                            && !arrow.is(e.target)) { // и не по arrow
                            // скрываем его
                            hidePopup(slider)
                        }
                    });

                });
            }
        });
    }

    createSlider($('.slider'), 1, 50, '.slider__prev-arrow', '.slider__next-arrow', '.slider__thumb-prev', '.slider__thumb-next');
    createSlider($('.slider2'), 51, 100, '.slider2__prev-arrow', '.slider2__next-arrow', '.slider2__thumb-prev', '.slider2__thumb-next');
});
