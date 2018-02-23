$(document).ready(function () {
    alert('click on tab');
    var slider = $('.slider');
    function createSlide(slideNumber, src, title, date) {
        slider.append(`<div class="slide ${slideNumber}"><img class="slideImg" src='${src}'><h2 class="title">${title}</h2><p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consectetur iusto molestias neque! Debitis, dolore.</p><p class="date">${date}</p><button class="btn">More</button></div>`);
    }
    $('.arrow-right').on('click', function () {
        slider.attr('style', 'left:-414px')
    });
    $('.arrow-left').on('click', function () {
        slider.attr('style', 'left:0')
    });
    $('.tab').on('click', function () {
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $('.slide').remove();
        if($(this).hasClass('tab1')) {
            createSlide('slide1', 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png', 'Tab1 Title 1', 'Oct 24');
            createSlide('slide2', 'https://drivenlocal.com/wp-content/themes/newdl/images/icon-user-default.png', 'Tab1 Title 2', 'Oct 25');
            createSlide('slide3', 'https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_man_male_profile_account_person_people-512.png', 'Tab1 Title 3', 'Oct 26');
            createSlide('slide4', 'http://rhfms.nic.in/netiay/fto_img/loginimg.png', 'Tab1 Title 4', 'Oct 27');
        } else if ($(this).hasClass('tab2')) {
            createSlide('slide1', 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png', 'Tab2 Title 1', 'Oct 24');
            createSlide('slide2', 'https://drivenlocal.com/wp-content/themes/newdl/images/icon-user-default.png', 'Tab2 Title 2', 'Oct 25');
            createSlide('slide3', 'https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_man_male_profile_account_person_people-512.png', 'Tab2 Title 3', 'Oct 26');
            createSlide('slide4', 'http://rhfms.nic.in/netiay/fto_img/loginimg.png', 'Tab2 Title 4', 'Oct 27');
        }
        $('.btn').on('click', function () {
            if($('.tab1').hasClass('active')) {
                modalSlider($(this));
                arrowsClick();

            } else if ($('.tab2').hasClass('active')) {
                modalSlider2($(this));
                arrowsClick();
            }
        });


    });
    function counterBlockContent() {
        var style = $('.modalSlide-container').attr('style');
        if (style === undefined || style.substring(5, style.length - 2) === "0") {
            $('.counter').html('1/4')
        }
        if (style === 'left:-700px') {
            $('.counter').html('2/4')
        }
        if (style === 'left:-1400px') {
            $('.counter').html('3/4')
        }
        if (style === 'left:-2100px') {
            $('.counter').html('4/4')
        }
    }
    function arrowsClick() {
        var arrowLeft = $('.modal-arrows .arrow-left');
        var arrowRight = $('.modal-arrows .arrow-right');
        arrowRight.on('click', function () {
            var style = $('.modalSlide-container').attr('style');
            if (style === undefined || style.substring(5, style.length-2) === "0") {
                var posWeNeed = -700;
                var style = 'left:' + posWeNeed + 'px';
                $('.modalSlide-container').attr('style', style)
            } else if (style.substring(5, style.length-2) !== '0' & style.substring(5, style.length-2) !== "-2100") {
                var currentPosition = style.substring(5, style.length-2);
                var posWeNeed = currentPosition - 700;
                var style = 'left:' + posWeNeed + 'px';
                $('.modalSlide-container').attr('style', style)
            } else if (style.substring(5, style.length-2) === "-2100") {
                var posWeNeed = 0;
                var style = 'left:' + posWeNeed + 'px';
                $('.modalSlide-container').attr('style', style)
            }
            counterBlockContent();
        });
        arrowLeft.on('click', function () {
            var style = $('.modalSlide-container').attr('style');
            if (style === undefined) {
                $('.modalSlide-container').attr('style', 'left:-2100px')
            } else if (style.substring(5, style.length-2) !== '0') {
                var currentPosition = style.substring(5, style.length-2);
                var posWeNeed = currentPosition - 700 + 1400;
                var style = 'left:' + posWeNeed + 'px';
                $('.modalSlide-container').attr('style', style)
            } else if (style.substring(5, style.length-2) === 'NaN' || style.substring(5, style.length-2) === '0') {
                var style = 'left:' + -2100 + 'px';
                $('.modalSlide-container').attr('style', style)
            }
            counterBlockContent();
        });
        counterBlockContent();
    }
    function createModalSlide(slideNumber, src, title, text1, text2, text3, text4, date) {
        $('.modalSlide-container').append(`<div class="modalSlide ${slideNumber}"><div class="modalSlideContent"><h2 class="title">${title}</h2><p class="description">${text1}</p><p class="description">${text2}</p><p class="description">${text3}</p><p class="description">${text4}</p><p class="date">${date}</p></div><img class="modalSlideImg" src="${src}"></div>`);
        counterBlockContent();
    }
    function modalSlider(btn) {
        var slide = btn[0].parentElement.classList[1];
        var parentSlide = '.' + slide;
        $("body").append("<div class='modal'><div class='modal_bg'></div><div class='modalSlide-wrapper'/></div></div>");
        $(".modal").fadeIn(800); // Медленно выводим изображение
        $(".modal_bg").click(function(){	// Событие клика на затемненный фон
            $(".modal").fadeOut(800);	// Медленно убираем всплывающее окно
            $(".modal").remove(); // Удаляем разметку всплывающего окна
        });
        $('.modalSlide-wrapper').append(`<div class="counter"></div><div class="modalSlide-container"></div><div class="modal-arrows"><div class='arrow arrow-left'><i class='fa fa-arrow-circle-left' aria-hidden='true'></i></div><div class='arrow arrow-right'><i class='fa fa-arrow-circle-right' aria-hidden='true'></i></div></div>`);
        createModalSlide('modal-slide1', 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png', 'modal Tab1 Title 1', 'text1', 'text2', 'text3', 'text4', 'Oct 24');
        createModalSlide('modal-slide2', 'https://drivenlocal.com/wp-content/themes/newdl/images/icon-user-default.png', 'modal Tab1 Title 2', 'text1', 'text2', 'text3', 'text4', 'Oct 25');
        createModalSlide('modal-slide3', 'https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_man_male_profile_account_person_people-512.png', 'modal Tab1 Title 3', 'text1', 'text2', 'text3', 'text4', 'Oct 26');
        createModalSlide('modal-slide4', 'http://rhfms.nic.in/netiay/fto_img/loginimg.png', 'modal Tab1 Title 4', 'text1', 'text2', 'text3', 'text4', 'Oct 27');
        counterBlockContent();
        if(parentSlide === '.slide1') {
            $('.modalSlide-container').attr('style', 'left:0px')
        }
        if(parentSlide === '.slide2') {
            $('.modalSlide-container').attr('style', 'left:-700px')
        }
        if(parentSlide === '.slide3') {
            $('.modalSlide-container').attr('style', 'left:-1400px')
        }
        if(parentSlide === '.slide4') {
            $('.modalSlide-container').attr('style', 'left:-2100px')
        }


    }
    // в этой функции просто изменяю контент модал слайдера
    function modalSlider2(btn) {
        var slide = btn[0].parentElement.classList[1];
        var parentSlide = '.' + slide;
        $("body").append("<div class='modal'><div class='modal_bg'></div><div class='modalSlide-wrapper'/></div></div>");
        $(".modal").fadeIn(800); // Медленно выводим изображение
        $(".modal_bg").click(function(){	// Событие клика на затемненный фон
            $(".modal").fadeOut(800);	// Медленно убираем всплывающее окно
            $(".modal").remove(); // Удаляем разметку всплывающего окна
        });
        $('.modalSlide-wrapper').append(`<div class="counter"></div><div class="modalSlide-container"></div><div class="modal-arrows"><div class='arrow arrow-left'><i class='fa fa-arrow-circle-left' aria-hidden='true'></i></div><div class='arrow arrow-right'><i class='fa fa-arrow-circle-right' aria-hidden='true'></i></div></div>`);
        createModalSlide('modal-slide1', 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png', 'modal Tab2 Title 1', 'text1', 'text2', 'text3', 'text4', 'Oct 24');
        createModalSlide('modal-slide2', 'https://drivenlocal.com/wp-content/themes/newdl/images/icon-user-default.png', 'modal Tab2 Title 2', 'text1', 'text2', 'text3', 'text4', 'Oct 25');
        createModalSlide('modal-slide3', 'https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_man_male_profile_account_person_people-512.png', 'modal Tab2 Title 3', 'text1', 'text2', 'text3', 'text4', 'Oct 26');
        createModalSlide('modal-slide4', 'http://rhfms.nic.in/netiay/fto_img/loginimg.png', 'modal Tab2 Title 4', 'text1', 'text2', 'text3', 'text4', 'Oct 27');

        if(parentSlide === '.slide1') {
            $('.modalSlide-container').attr('style', 'left:0px')
        }
        if(parentSlide === '.slide2') {
            $('.modalSlide-container').attr('style', 'left:-700px')
        }
        if(parentSlide === '.slide3') {
            $('.modalSlide-container').attr('style', 'left:-1400px')
        }
        if(parentSlide === '.slide4') {
            $('.modalSlide-container').attr('style', 'left:-2100px')
        }


    }


});
