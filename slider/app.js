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
    function createSlider(i) {
        var slider = $('.slider')[i];
        var url = $(slider).data('url');
        $.ajax({
            url: url,
            dataType: "json",
            context: slider.append(loader),
            success: function (html) {
                    function createAlbum() {
                        var slider = $('.slider')[i];
                        var firstNumber = $(slider).data('firstImg') - 1;
                        var lastNumber = $(slider).data('lastImg') - 1;
                        $(slider).append(`<div class="slider__slides"></div>`);
                        $(slider).append(`<div class="slider__nav"></div>`);
                        for (b = firstNumber; b <= lastNumber; b++) {
                            //big images
                            $($('.slider__slides')[i]).append(`<div class="slider__slide"><img src='${html[b].url}' alt='${html[b].title}'></div>`);
                            // small images
                            $($('.slider__nav')[i]).append(`<div class="slider__thumbnail"><img src='${html[b].thumbnailUrl}' alt='${html[b].title}'></div>`);
                        }
                    }
                createAlbum();
                var sliderContainer = $('.slider__slides')[i];
                $(sliderContainer).slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    prevArrow: $($('.slider')[i]).children($('.slider__prev-arrow')),
                    nextArrow: $($('.slider')[i]).children($('.slider__next-arrow'))
                });
                var sliderNav = $('.slider__nav')[i];
                $(sliderNav).slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    asNavFor: sliderContainer,
                    focusOnSelect: true,
                    prevArrow: $($('.slider')[i]).children($('.slider__thumb-prev')),
                    nextArrow: $($('.slider')[i]).children($('.slider__thumb-next'))
                });

                loader.remove();

                // функция отображения и закрытия модального окна
                var bigimg = $('.slider__slide');
                $(bigimg).on('click', function () {
                    var slider = $(this).closest($('.slider'));
                    var arrow = $('.slick-arrow');
                    var img = $('.slider__slide img');
                    var slickList = $(this).closest('.slick-list');
                    var nav = slider.children('.slider__nav');
                    // Добавление классов для работы popup
                    $(slickList).add($(img)).addClass('popup__size');
                    $('.slider__prev-arrow').add($('.slider__next-arrow')).addClass('popup__arrow');
                    $(nav).add($('.slider__thumb-prev')).add($('.slider__thumb-next')).addClass('hide');

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
        createSlider(i);
        i++;
    });
});
