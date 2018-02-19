$(document).ready(function () {
    // var url = 'https://jsonplaceholder.typicode.com/photos';
    var loader = document.createElement('div');
    $(loader).addClass('loader');
    function showPopup(slider) {
        $(slider).addClass('js-show-popup');
    }
    function hidePopup(slider) {
        $(slider).removeClass('js-show-popup');
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
                        $(slideContainer).addClass(sliderClass + '__slides');
                        var sliderNav = document.createElement('div');
                        $(sliderNav).addClass(sliderClass + '__nav');
                        for (i = firstNumber; i <= lastNumber; i++) {
                            //big images
                            var slide = document.createElement('div');
                            $(slide).addClass(sliderClass + '__slide');
                            var img = document.createElement('img');
                            $(img).attr('src', html[i].url);
                            $(img).attr('alt', html[i].title);
                            slide.append(img);
                            slideContainer.append(slide);
                            // small images
                            var smallSlide = document.createElement('div');
                            $(smallSlide).addClass(sliderClass + '__thumbnails');
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
                var sliderContainer = ($('.' + sliderClass + '__slides')[0]);
                $(sliderContainer).slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    prevArrow: prevArrowClass,
                    nextArrow: nextArrowClass
                });
                var sliderNav = ($('.' + sliderClass + '__nav')[0]);
                $(sliderNav).slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: sliderContainer,
                    focusOnSelect: true,
                    prevArrow: thumbnailPrevClass,
                    nextArrow: thumbnailNextClass
                });
                loader.remove();

                // функция отображения и закрытия модального окна
                var bigimg = $('.' + sliderClass + '__slide');
                $(bigimg).on('click', function () {
                    // console.log($(this)[0]); //slide
                    var findSlider = '.' + sliderClass;
                    var slider = $(this).closest(findSlider); //slider
                    var arrow = $('.slick-arrow');
                    var className = (($(this)[0]).className).substr(0, ($(this)[0]).className.length - 39);
                    console.log(className);
                    var img = $('.' + className + ' img');
                    var slickList = $(this).closest('.slick-list');
                    var slide = $(this);
                    // var sliderNavClass = '.' + sliderClass + '__nav';
                    var nav = slider.children('.' + sliderClass + '__nav');
                    // Добавление классов для работы popup
                    $(slickList).addClass('popup__size'); //slick-list
                    $(slide).addClass('popup__size_im'); //slide
                    $(img).addClass('popup__size'); //img
                    $(prevArrowClass).addClass('popup__arrow');
                    $(nextArrowClass).addClass('popup__arrow');
                    $(nav).addClass('hide'); // nav
                    $(thumbnailPrevClass).addClass('hide');
                    $(thumbnailNextClass).addClass('hide');

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
