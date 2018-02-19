

$(document).ready(function () {


    function createSlider(sliderClass, minVal, maxVal) {
     var rangeSlider = $(sliderClass);
     var input = $(rangeSlider).children('input');
     var min = minVal;
     var max = maxVal;
     var bg = $(rangeSlider).children('.slider__value').children('.slider-bg');
     var x = $(bg).width() / 100;

     var valSvg = $(rangeSlider).children('.slider__value').children('.slider-val');
     function inputValue() {
         input.on('change', function () {
             var handle = $(this).parent().children('.ui-slider-handle');
             var val = input.val();
             var style = val * x + 'px';
             var svgSize = val * x;
             var viewBoxVal = '0 ' + '0 ' + svgSize + ' ' + $(bg).height();
             if ($.isNumeric(val) === true && val >= min && val <= max) {
                 $(handle).css('left', style);
                 $(valSvg).attr('width', style);
                 $(valSvg).attr('viewBox', viewBoxVal);
             } else if($.isNumeric(val) === false || val === '') {
             } else if(val < 0) {
                 $(handle).css('left', 0);
                 $(valSvg).attr('width', 0);
                 $(valSvg).attr('viewBox', '0 0 0 0');
             } else if(val > 100) {
                 var width = 100 * x;
                 var style = width + 'px';
                 var viewBoxVal = '0 ' + '0 ' + width + ' ' + $(bg).height();
                 $(handle).css('left', '100%');
                 $(valSvg).attr('width', style);
                 $(valSvg).attr('viewBox', viewBoxVal);
             }
         })
     }
     inputValue();
     rangeSlider.slider({
         value:0,
         min: 0,
         max: 100,
         animate: '1000',
         step: 1,
         slide: function( event, ui ) {
             var svgSize = ui.value * x;
             var style = svgSize + 'px';
             var viewBoxVal = '0 ' + '0 ' + svgSize + ' ' + $(bg).height();
             input.val(ui.value);
             $(valSvg).attr('width', style);
             $(valSvg).attr('viewBox', viewBoxVal);

         }
     });

 }
    createSlider('.slider1', 0, 100);
    createSlider('.slider2', 0, 100);



});
