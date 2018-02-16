'use strict';

(function () {

  window.configureNoticeForm();

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mouseup', function () {
    var mapSection = document.querySelector('.map');
    mapSection.classList.remove('map--faded');
    document.querySelector('.notice__form').classList.remove('notice__form--disabled');
    var noticeFormFieldsets = document.querySelectorAll('.notice__form fieldset');

    for (var i = 0; i < noticeFormFieldsets.length; i++) {
      noticeFormFieldsets[i].disabled = false;
    }

    document.querySelector('#address').disabled = true;

    document.querySelector('#address').value = (mainPin.offsetLeft + mainPin.offsetWidth / 2)
        + ', ' + (mainPin.offsetTop + mainPin.offsetHeight);

    window.fillMapPins(document.querySelector('.map__pins'));
  });
})();
