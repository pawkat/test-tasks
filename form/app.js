function submitOk(inputId) {
    var submit = $(inputId).parent().children('.submit');
    console.log(submit);
    $(submit).removeAttr('disabled');
    $(submit).css('background', 'transparent');
    inputOk(inputId);
}
function submitError(input) {
    $(input).css('border', '1px solid red');
    $(input).addClass('error');
}
function inputOk(inputId) {
    inputId.css('border', '1px solid green');
    inputId.removeClass('error');
}
function testInput(form, event) {
    var form = $(form);
    var button = $(form).find('.submit');
    form.children().each(function () {
        if($(this).hasClass('error')) {
            $(button).attr('disabled', 'disabled');
            $(button).css('background', 'darkgrey');
            event.preventDefault();
        }
    })
}
function testVal(input) {
    // проверка не пустое ли поле
    if (input.val() === '') {
        submitError(input);
    }
}
function createPattern(input) {
    var dataPattern = $(input)[0].dataset.pattern;
    var flag = $(input)[0].dataset.patternFlag;
    if (flag === undefined) {
        var pattern = new RegExp(dataPattern);
        return pattern;
    } else {
        var pattern = new RegExp(dataPattern,flag);
        return pattern;
    }
}
function testPattern(input) {
    var pattern = createPattern(input);
    if (input.val() != '') {
        if (pattern.test($(input).val())) {
            submitOk($(input));
        } else {
            submitError($(input));

        }
    }
};
$(document).ready(function () {
    var form = $('.form');
    var name = $('.name');
    var phone = $('.phone');
    var email = $('.email');
    var password = $('.password');
    var submit = $('.submit');
    var item = $('.form__item');
    password.on('mouseover', function () {
        $('.password_help').css('display', 'block')
    });
    password.on('mouseout', function () {
        $('.password_help').css('display', 'none')
    });
    //http://realadmin.ru/coding/valid-field-js.html
    //http://javascript.ru/basic/regular-expression
    // Если передавать паттерны, то их нужно писать без /
    // var emailPattern = /^[\w\.-]+@[\w-]+\.[a-z \.]{2,6}$/i;
    // var namePattern = /^[A-z]+$/g;
    // var phonePattern = /^\d+$/i;
    // var phoneLength = 10;
    // var passwordPattern = /^[A-Z]+[a-z]+[\d]+$/g;

    item.on('blur', (function () {
        testVal($(this));
        testPattern($(this));
    })
    );
    $(form).on('submit', function (e) {
        var event = e;
        testInput($(this), event);
        }
    );
});
