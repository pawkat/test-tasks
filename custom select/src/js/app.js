// import sayHello from './lib/sayHello.js';
//
// sayHello();


// ADD id + add class + delete common options
// $( document ).ready( function() {
//   var select = $('.blabla');
//   function selectSettings() {
//     //ADD id
//     select.attr('id', 'selectId');
//     // add class
//     select.attr('class', 'blabla select');
//
//     //delete common options
//     function deleteCommon(val) {
//       if (select[0][0].value === val) {
//         select[0][0].remove();
//       }
//     }
//
//     deleteCommon('”op1”');
//     deleteCommon('”op2”');
//     deleteCommon('”op3”');
//   }
//   selectSettings();
// Добавляем placeholder

// function addPlaceholder() {
//   var newOption = document.createElement('option');
//   $(newOption).html('Город*');
//   $(newOption).attr('value', 'Не выбрано');
//   $(newOption).attr('hidden', 'hidden');
//   $(select).append(newOption);
// }
// addPlaceholder();

// Добавляем option





// // Цвет текста в селекте(placeholder)
// $('.form').on('click', function placeholderColor() {
//   if ($('.blabla')[0].value !== 'Не выбрано') {
//     $('.select__gap').css('color', '#444444');
//   }
//
//   // Отображение поля (Обязательное для заполнения поле)
//   $('.form').on('mousemove', function() {
//     if ($('.blabla')[0].value !== 'Не выбрано' & $('.form_name')[0].value !== '') {
//       $('.mandatory').css('display', 'none');
//     }
//     if ($('.blabla')[0].value === 'Не выбрано' || $('.form_name')[0].value === '') {
//       $('.mandatory').css('display', 'flex');
//     }
//   });
// });


//
// // Radio slider
// $('.radio_1').on('click', function() {
//   $('.radio span').removeClass('radio_active');
//   $('.radio_1').addClass('radio_active');
// });
// $('.radio_2').on('click', function() {
//   $('.radio span').removeClass('radio_active');
//   $('.radio_2').addClass('radio_active');
// });
// $('.radio_3').on('click', function() {
//   $('.radio span').removeClass('radio_active');
//   $('.radio_3').addClass('radio_active');
// });
// // стрелка вверх
// $('.arrows_1').on('click', function() {
//   var activeIndex = $('.radio_active').index();
//   if (activeIndex === 0) {
//     $('.radio_1').removeClass('radio_active');
//     $('.radio_3').addClass('radio_active');
//   }
//   if (activeIndex === 1) {
//     $('.radio_2').removeClass('radio_active');
//     $('.radio_1').addClass('radio_active');
//   }
//   if (activeIndex === 2) {
//     $('.radio_3').removeClass('radio_active');
//     $('.radio_2').addClass('radio_active');
//   }
// });
// // стрелка вниз
// $('.arrows_2').on('click', function() {
//   var activeIndex = $('.radio_active').index();
//   if (activeIndex === 0) {
//     $('.radio_1').removeClass('radio_active');
//     $('.radio_2').addClass('radio_active');
//   }
//   if (activeIndex === 1) {
//     $('.radio_2').removeClass('radio_active');
//     $('.radio_3').addClass('radio_active');
//   }
//   if (activeIndex === 2) {
//     $('.radio_3').removeClass('radio_active');
//     $('.radio_1').addClass('radio_active');
//   }
// });

//
//
// // Page active
// $('.page_1').on('click', function() {
//   $('.page').removeClass('active');
//   $('.page_1').addClass('active');
// });
// $('.page_2').on('click', function() {
//   $('.page').removeClass('active');
//   $('.page_2').addClass('active');
// });
// $('.page_3').on('click', function() {
//   $('.page').removeClass('active');
//   $('.page_3').addClass('active');
// });
// // Page arrow slide
// $('.pages_arrowleft').on('click', function() {
//   var activeIndex = $('.active').index();
//   if (activeIndex === 0) {
//     $('.page_1').removeClass('active');
//     $('.page_3').addClass('active');
//   }
//   if (activeIndex === 1) {
//     $('.page_2').removeClass('active');
//     $('.page_1').addClass('active');
//   }
//   if (activeIndex === 2) {
//     $('.page_3').removeClass('active');
//     $('.page_2').addClass('active');
//   }
// });
// $('.pages_arrowright').on('click', function() {
//   var activeIndex = $('.active').index();
//   if (activeIndex === 0) {
//     $('.page_1').removeClass('active');
//     $('.page_2').addClass('active');
//   }
//   if (activeIndex === 1) {
//     $('.page_2').removeClass('active');
//     $('.page_3').addClass('active');
//   }
//   if (activeIndex === 2) {
//     $('.page_3').removeClass('active');
//     $('.page_1').addClass('active');
//   }
// });
//
// // LANGUAGE
// $('.language_ua').on('click', function() {
//   $('.language p').removeClass('active');
//   $('.language_ua').addClass('active');
// });
// $('.language_ru').on('click', function() {
//   $('.language p').removeClass('active');
//   $('.language_ru').addClass('active');
// });
// $('.language_en').on('click', function() {
//   $('.language p').removeClass('active');
//   $('.language_en').addClass('active');
// });

// SELECT 2 (Bt)

// $('.select-2').each(function() {
//   var $this = $(this),
//     selectOption = $this.find('option'),
//     selectOptionLength = selectOption.length,
//     selectedOption = selectOption.filter(':selected'),
//     dur = 500;
//   var placeholder = $(this)[0].dataset.placeholder;
//   $this.hide();
//   $this.wrap('<div class="select"></div>');
//   $('<div>', {
//     class: 'select__gap',
//     text: placeholder
//   }).insertAfter($this);
//
//   var selectGap = $this.next('.select__gap'),
//     caret = selectGap.find('.caret');
//   $('<ul>', {
//     class: 'select__list'
//   }).insertAfter(selectGap);
//
//   var selectList = selectGap.next('.select__list');
//   // Add li - option items
//   for (var i = 0; i < selectOptionLength; i++) {
//     $('<li>', {
//       class: 'select__item',
//       html: $('<span>', {
//         text: selectOption.eq(i).text()
//       })
//     })
//       .attr('data-value', selectOption.eq(i).val())
//       .appendTo(selectList);
//   }
//   var selectItem = selectList.find('li');
//
//   selectList.slideUp(0);
//   selectGap.on('click', function() {
//     if (!$(this).hasClass('on')) {
//       $(this).addClass('on');
//       selectList.slideDown(dur);
//
//       selectItem.on('click', function() {
//         var chooseItemIndex = $(this).index();
//         $($('.select-2').children()).removeAttr('selected');
//         $($('.select-2').children()[chooseItemIndex]).attr('selected', 'selected');
//         selectGap.text($(this).find('span').text());
//
//         selectList.slideUp(dur);
//         selectGap.removeClass('on');
//       });
//
//     } else {
//       $(this).removeClass('on');
//       selectList.slideUp(dur);
//     }
//   });
// });
// // PROMPT
// $('.prompt').on('mouseover', function() {
//   $(this).next().addClass('block');
// });
// $('.prompt').on('mouseout', function() {
//   $(this).next().removeClass('block');
// });

// });
$('.select').each(function() {
  var $this = $(this),
    selectOption = $this.find('option'),
    selectOptionLength = selectOption.length,
    selectedOption = selectOption.filter(':selected'),
    dur = 500;
  var placeholder = $(this)[0].dataset.placeholder;
  $this.hide();
  $this.wrap('<div class="select"></div>');
  $('<div>', {
    class: 'select__gap',
    text: placeholder
  }).insertAfter($this);

  var selectGap = $this.next('.select__gap'),
    caret = selectGap.find('.caret');
  $('<ul>', {
    class: 'select__list'
  }).insertAfter(selectGap);

  var selectList = selectGap.next('.select__list');
  // Add li - option items
  for (var i = 0; i < selectOptionLength; i++) {
    $('<li>', {
      class: 'select__item',
      html: $('<span>', {
        text: selectOption.eq(i).text()
      })
    })
      .attr('data-value', selectOption.eq(i).val())
      .appendTo(selectList);
  }
  var selectItem = selectList.find('li');

  selectList.slideUp(0);
  selectGap.on('click', function() {
    if (!$(this).hasClass('on')) {
      $(this).addClass('on');
      selectList.slideDown(dur);
      selectItem.on('click', function() {
        // var chooseItem = $(this).data('value');
        //
        // $('select').val(chooseItem).attr('selected', 'selected');
        var chooseItemIndex = $(this).index();
        // console.log($(this).closest('.select').find('select'));
        $($(this).closest('.select').find('select').children()).removeAttr('selected');
        $($(this).closest('.select').find('select').children()[chooseItemIndex]).attr('selected', 'selected');
        selectGap.text($(this).find('span').text());
        selectList.slideUp(dur);
        selectGap.removeClass('on');
      });

    } else {
      $(this).removeClass('on');
      selectList.slideUp(dur);
    }
  });
});



