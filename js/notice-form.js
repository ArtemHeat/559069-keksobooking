'use strict';

window.configureNoticeForm = function () {
  var mapSection = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var deactivateNoticeForm = function () {
    mapSection.classList.add('map--faded');
    document.querySelector('.notice__form').classList.add('notice__form--disabled');
    var noticeFormFieldsets = document.querySelectorAll('.notice__form fieldset');

    for (var i = 0; i < noticeFormFieldsets.length; i++) {
      noticeFormFieldsets[i].disabled = true;
    }

    document.querySelector('#address').value = (mainPin.offsetLeft + mainPin.offsetWidth / 2)
        + ', ' + (mainPin.offsetTop + mainPin.offsetHeight / 2);

    var pins = mapSection.querySelectorAll('.map__pin');
    var pinsList = mapSection.querySelector('.map__pins');

    for (i = 1; i < pins.length; i++) {
      pinsList.removeChild(pins[i]);
    }
  };

  deactivateNoticeForm();

  var noticeForm = document.querySelector('.notice__form');
  var typeSelect = noticeForm.querySelector('#type');
  var priceInput = noticeForm.querySelector('#price');

  var setPriceMinVal = function () {
    if (typeSelect.value === 'bungalo') {
      priceInput.min = '0';
    } else if (typeSelect.value === 'flat') {
      priceInput.min = '1000';
    } else if (typeSelect.value === 'house') {
      priceInput.min = '5000';
    } else if (typeSelect.value === 'palace') {
      priceInput.min = '10000';
    }
  };

  setPriceMinVal();

  typeSelect.addEventListener('click', function () {
    setPriceMinVal();
  });

  var roomNumberSelect = noticeForm.querySelector('#room_number');
  var capacitySelect = noticeForm.querySelector('#capacity');

  var sayWrongCapacity = function () {
    if (capacitySelect.value > roomNumberSelect.value
      && capacitySelect.value !== '0' && roomNumberSelect.value !== '100'
      || capacitySelect.value === '0' && roomNumberSelect.value !== '100'
      || capacitySelect.value !== '0' && roomNumberSelect.value === '100') {
      capacitySelect.setCustomValidity('Минимальное количество мест 1.'
        + ' Максимальное количество мест равно количеству комнат.'
        + ' Для 100 комнат возможен один вариант - \"не для гостей\" ');
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  sayWrongCapacity();

  capacitySelect.addEventListener('click', function () {
    sayWrongCapacity();
  });
  roomNumberSelect.addEventListener('click', function () {
    sayWrongCapacity();
  });

  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');

  var onTimeInClick = function () {
    timeOut.value = timeIn.value;
  };

  var onTimeOutClick = function () {
    timeIn.value = timeOut.value;
  };

  timeIn.addEventListener('click', onTimeInClick);
  timeOut.addEventListener('click', onTimeOutClick);

  var resetBtn = noticeForm.querySelector('.form__reset');

  resetBtn.addEventListener('click', function () {
    deactivateNoticeForm();
    window.closeMapCard();
  });
};
