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
    function createSlider(sliderDiv, prevArrowClass, nextArrowClass, thumbnailPrevClass, thumbnailNextClass, i) {
        var slider = $(sliderDiv)[i];
        var url = $(slider).data('url');
        var firstNumber = $(slider).data('firstImg') - 1;
        var lastNumber = $(slider).data('lastImg') - 1;

        $.ajax({
            url: url,
            dataType: "json",
            context: slider.append(loader),
            success: function (html) {
                var sliderClass = $(sliderDiv)[0].className;
                    function createAlbum(sliderDiv) {
                        var slider = $(sliderDiv)[i];
                        var sliderClass = $(sliderDiv)[0].className; /// все названия в зависимости от этого класса
                        var slideContainer = document.createElement('div');
                        $(slideContainer).addClass(sliderClass + '__slides');
                        var sliderNav = document.createElement('div');
                        $(sliderNav).addClass(sliderClass + '__nav');
                        for (b = firstNumber; b <= lastNumber; b++) {
                            //big images
                            var slide = document.createElement('div');
                            $(slide).addClass(sliderClass + '__slide');
                            var img = document.createElement('img');
                            $(img).attr('src', html[b].url);
                            $(img).attr('alt', html[b].title);
                            slide.append(img);
                            slideContainer.append(slide);
                            // small images
                            var smallSlide = document.createElement('div');
                            $(smallSlide).addClass(sliderClass + '__thumbnails');
                            var imgsmall = document.createElement('img');
                            $(imgsmall).attr('src', html[b].thumbnailUrl);
                            $(imgsmall).attr('alt', html[b].title);
                            smallSlide.append(imgsmall);
                            sliderNav.append(smallSlide);
                        }
                        slider.append(slideContainer);
                        slider.append(sliderNav);
                    }
                createAlbum(sliderDiv, i);
                var sliderContainer = ($('.' + sliderClass + '__slides')[i]);
                $(sliderContainer).slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    prevArrow: $($(sliderDiv)[i]).children($(prevArrowClass)),
                    nextArrow: $($(sliderDiv)[i]).children($(prevArrowClass))
                });
                var sliderNav = ($('.' + sliderClass + '__nav')[i]);
                $(sliderNav).slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: sliderContainer,
                    focusOnSelect: true,
                    prevArrow: $($(sliderDiv)[i]).children($(thumbnailPrevClass)),
                    nextArrow: $($(sliderDiv)[i]).children($(thumbnailNextClass))
                });

                loader.remove();

                // функция отображения и закрытия модального окна
                var bigimg = $('.' + sliderClass + '__slide');
                $(bigimg).on('click', function () {
                    var slider = $(this).closest('.' + sliderClass); //slider
                    var arrow = $('.slick-arrow');
                    var className = (($(this)[0]).className).substr(0, ($(this)[0]).className.length - 39);
                    var img = $('.' + className + ' img');
                    var slickList = $(this).closest('.slick-list');
                    var slide = $(this);
                    var nav = slider.children('.' + sliderClass + '__nav');
                    // Добавление классов для работы popup
                    $(slickList).add($(img)).addClass('popup__size');
                    $(slide).addClass('popup__size_im');
                    $(prevArrowClass).add($(nextArrowClass)).addClass('popup__arrow');
                    $(nav).add($(thumbnailPrevClass)).add($(thumbnailNextClass)).addClass('hide');

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
    $('.slider').each(function (i, elem) {
        createSlider($('.slider'), '.slider__prev-arrow', '.slider__next-arrow', '.slider__thumb-prev', '.slider__thumb-next', i);
        i++;
    });
});
