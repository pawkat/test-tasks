$(document).ready(function () {
    alert('click on tab');
    var d = document;
    var slider = $('.slider');
    function createSlide(slideNumber, src, title, date) {
        var slide = d.createElement('div');
        $(slide).addClass('slide');
        $(slide).addClass(slideNumber);
        var slideImg = d.createElement('img');
        $(slideImg).addClass('slideImg');
        $(slideImg).attr('src', src);
        var h2 = d.createElement('h2');
        $(h2).addClass('title');
        $(h2).html(title);
        var description = d.createElement('p');
        $(description).html('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consectetur iusto molestias neque! Debitis, dolore.');
        $(description).addClass('description');
        var p2 = d.createElement('p');
        $(p2).addClass('date');
        $(p2).html(date);
        var btn = d.createElement('button');
        $(btn).addClass('btn');
        $(btn).html('More');
        slide.append(slideImg);
        slide.append(h2);
        slide.append(description);
        slide.append(p2);
        slide.append(btn);
        slider.append(slide);
    }
    $('.arrow-right').on('click', function () {
        slider.attr('style', 'left:-414px')
    });
    $('.arrow-left').on('click', function () {
        slider.attr('style', 'left:0')
    });
    $('.tab1').on('click', function () {
        $('.tab').removeClass('active');
        $('.tab1').addClass('active');
        $('.slide').remove();
        createSlide('slide1', 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png', 'Tab1 Title 1', 'Oct 24');
        createSlide('slide2', 'https://drivenlocal.com/wp-content/themes/newdl/images/icon-user-default.png', 'Tab1 Title 2', 'Oct 25');
        createSlide('slide3', 'https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_man_male_profile_account_person_people-512.png', 'Tab1 Title 3', 'Oct 26');
        createSlide('slide4', 'http://rhfms.nic.in/netiay/fto_img/loginimg.png', 'Tab1 Title 4', 'Oct 27');
    });
    $('.tab2').on('click', function () {
        $('.tab').removeClass('active');
        $('.tab2').addClass('active');
        $('.slide').remove();
        createSlide('slide1', 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png', 'Tab2 Title 1', 'Oct 24');
        createSlide('slide2', 'https://drivenlocal.com/wp-content/themes/newdl/images/icon-user-default.png', 'Tab2 Title 2', 'Oct 25');
        createSlide('slide3', 'https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_man_male_profile_account_person_people-512.png', 'Tab2 Title 3', 'Oct 26');
        createSlide('slide4', 'http://rhfms.nic.in/netiay/fto_img/loginimg.png', 'Tab2 Title 4', 'Oct 27');
    });
    function createModalSlide(slideNumber, src, title, text1, text2, text3, text4, date) {
        var d = document;
        var modalSlide = d.createElement('div');
        $(modalSlide).addClass('modalSlide');
        $(modalSlide).addClass(slideNumber);
        var slideContent = d.createElement('div');
        $(slideContent).addClass('modalSlideContent');
        var slideImg = d.createElement('img');
        $(slideImg).addClass('modalSlideImg');
        $(slideImg).attr('src', src);
        var h2 = d.createElement('h2');
        $(h2).addClass('title');
        $(h2).html(title);
        var description = d.createElement('p');
        $(description).html(text1);
        $(description).addClass('description');
        var description1 = d.createElement('p');
        $(description1).html(text2);
        $(description1).addClass('description');
        var description2 = d.createElement('p');
        $(description2).html(text3);
        $(description2).addClass('description');
        var description3 = d.createElement('p');
        $(description3).html(text4);
        $(description3).addClass('description');
        var p = d.createElement('p');
        $(p).addClass('date');
        $(p).html(date);

        slideContent.append(h2);
        slideContent.append(description);
        slideContent.append(description1);
        slideContent.append(description2);
        slideContent.append(description3);
        slideContent.append(p);
        modalSlide.append(slideContent);
        modalSlide.append(slideImg);
        $('.modalSlide-container').append(modalSlide);
    }
    function modalSliderArrows() {
        var arrows = document.createElement('div');
        $(arrows).addClass('modal-arrows');
        $(arrows).append("<div class='arrow arrow-left'>"+
            "<i class='fa fa-arrow-circle-left' aria-hidden='true'></i>"+
            "</div>"+
            "<div class='arrow arrow-right'>"+
            "<i class='fa fa-arrow-circle-right' aria-hidden='true'></i>"+
            "</div>"
        );
        $('.modal').append(arrows);
    }
    function counterBlock() {
        var counter = d.createElement('div');
        $(counter).addClass('counter');
        $('.modalSlideContent').append(counter);
    }
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
    function modalSlider() {
        var slide = this.parentElement.classList[1];
        var parentSlide = '.' + slide;
        $("body").append("<div class='modal'>"+ //Добавляем в тело документа разметку всплывающего окна
            "<div class='modal_bg'></div>"+ // Блок, который будет служить фоном затемненным
            "<div class='modalSlide-wrapper'/></div>"+
            "</div>");
        $(".modal").fadeIn(800); // Медленно выводим изображение
        $(".modal_bg").click(function(){	// Событие клика на затемненный фон
            $(".modal").fadeOut(800);	// Медленно убираем всплывающее окно
            setTimeout(function() {	// Выставляем таймер
                $(".modal").remove(); // Удаляем разметку всплывающего окна
            }, 800);
        });
        var modalSlideContainer = document.createElement('div');
        $(modalSlideContainer).addClass('modalSlide-container');
        $('.modalSlide-wrapper').append(modalSlideContainer);
        createModalSlide('modal-slide1', 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png', 'modal Tab1 Title 1', 'text1', 'text2', 'text3', 'text4', 'Oct 24');
        createModalSlide('modal-slide2', 'https://drivenlocal.com/wp-content/themes/newdl/images/icon-user-default.png', 'modal Tab1 Title 2', 'text1', 'text2', 'text3', 'text4', 'Oct 25');
        createModalSlide('modal-slide3', 'https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_man_male_profile_account_person_people-512.png', 'modal Tab1 Title 3', 'text1', 'text2', 'text3', 'text4', 'Oct 26');
        createModalSlide('modal-slide4', 'http://rhfms.nic.in/netiay/fto_img/loginimg.png', 'modal Tab1 Title 4', 'text1', 'text2', 'text3', 'text4', 'Oct 27');
        modalSliderArrows();
        counterBlock();
        counterBlockContent();
        if(parentSlide === '.slide2') {
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
    }
    // в этой функции просто изменяю контент модал слайдера
    function modalSlider1() {
        var slide = this.parentElement.classList[1];
        var parentSlide = '.' + slide;
        $("body").append("<div class='modal'>"+ //Добавляем в тело документа разметку всплывающего окна
            "<div class='modal_bg'></div>"+ // Блок, который будет служить фоном затемненным
            "<div class='modalSlide-wrapper'/></div>"+
            "</div>");
        $(".modal").fadeIn(800); // Медленно выводим изображение
        $(".modal_bg").click(function(){	// Событие клика на затемненный фон
            $(".modal").fadeOut(800);	// Медленно убираем всплывающее окно
            setTimeout(function() {	// Выставляем таймер
                $(".modal").remove(); // Удаляем разметку всплывающего окна
            }, 800);
        });
        var modalSlideContainer = document.createElement('div');
        $(modalSlideContainer).addClass('modalSlide-container');
        $('.modalSlide-wrapper').append(modalSlideContainer);
        createModalSlide('modal-slide1', 'https://cdn3.iconfinder.com/data/icons/black-easy/512/538642-user_512x512.png', 'modal Tab2 Title 1', 'text1', 'text2', 'text3', 'text4', 'Oct 24');
        createModalSlide('modal-slide2', 'https://drivenlocal.com/wp-content/themes/newdl/images/icon-user-default.png', 'modal Tab2 Title 2', 'text1', 'text2', 'text3', 'text4', 'Oct 25');
        createModalSlide('modal-slide3', 'https://cdn3.iconfinder.com/data/icons/toolbar-people/512/user_man_male_profile_account_person_people-512.png', 'modal Tab2 Title 3', 'text1', 'text2', 'text3', 'text4', 'Oct 26');
        createModalSlide('modal-slide4', 'http://rhfms.nic.in/netiay/fto_img/loginimg.png', 'modal Tab2 Title 4', 'text1', 'text2', 'text3', 'text4', 'Oct 27');
        modalSliderArrows();
        counterBlock();
        counterBlockContent();
        if(parentSlide === '.slide2') {
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
    }
    $('.btn').on('click', function () {
        if($('.tab1').hasClass('active')) {
            modalSlider();
        } else if ($('.tab2').hasClass('active')) {
            modalSlider1()
        }
    });
    // setInterval(function () {
    //     if ($('.tab1').hasClass('active')) {
    //         $('.btn').on('click', modalSlider);
    //     } else if ($('.tab2').hasClass('active')) {
    //         $('.btn').on('click', modalSlider1);
    //     }}, 1000)

});
