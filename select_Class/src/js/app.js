class Select {
  constructor(config) {
    this.config = config;
    this.select = config.selector || $('.js-select');
    this.optionWrap = config.optionWrap || 'span';
    this.dur = config.slideToggleTime || 400;
    this.init();
  }
  init() {
    this._hide();
    this._createWrapper();
    this._createPlaceholder();
    this._createList();
    this._onClick();
  }
  _hide() {
    this.select.hide();
  }
  _createWrapper() {
    this.select.wrap(`<div class="${Select.classes.wrapper}"></div>`);
  }
  _createPlaceholder() {
    let firstOptionText = $(this.select.find('option')[0]).text();
    let placeholderText = this.select.data('placeholder') || firstOptionText;
    $(`<div class="${Select.classes.placeholder}">${placeholderText}</div>`).insertAfter(this.select);
  }
  _createList() {
    let selectOption = this.select.find('option'),
      selectOptionLength = selectOption.length,
      optionWrap = this.optionWrap;
    let select = this.select.closest(`.${Select.classes.wrapper}`);
    select.append(`<ul class="${Select.classes.list}"></ul>`);
    let list = select.find(`.${Select.classes.list}`);
    for (let i = 0; i < selectOptionLength; i++) {
      let text = selectOption.eq(i).text(),
        value = selectOption.eq(i).val();
      (list).append(`<li class="${Select.classes.option}" data-value="${value}"><${optionWrap}>${text}</${optionWrap}></li>`);
    }
    list.slideUp(0);
  }
  _onClick() {
    let dur = this.dur,
      select = this.select.closest(`.${Select.classes.wrapper}`),
      placeholder = select.find(`.${Select.classes.placeholder}`),
      list = placeholder.siblings(`.${Select.classes.list}`),
      selectItem = list.find('li'),
      optionWrap = this.optionWrap;
    placeholder.on('click', function() {
      if (!$(this).hasClass('on')) {
        $(this).addClass('on');
        list.slideDown(dur);
        selectItem.on('click', function() {
          let chooseItemIndex = $(this).index();
          $($(this).closest(select).find('select').children()).removeAttr('selected');
          $($(this).closest(select).find('select').children()[chooseItemIndex]).attr('selected', 'selected');
          placeholder.text($(this).find(`${optionWrap}`).text());
          list.slideUp(dur);
          placeholder.removeClass('on');
        });
      } else {
        $(this).removeClass('on');
        list.slideUp(dur);
      }
      $(document).on('click', function(e) {
        if(!$(e.target).closest(select).length) {
          placeholder.removeClass('on');
          list.slideUp(dur);
        }
      });
    });
  }
}
Select.classes = {
  wrapper: 'select',
  placeholder: 'select__gap',
  list: 'select__list',
  option: 'select__item'
};
let select = new Select({
  selector: $('.js-select'),
  slideToggleTime: 400,
});
let select2 = new Select({
  selector: $('.js-select-2'),
  slideToggleTime: 400,
});
