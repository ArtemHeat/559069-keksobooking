'use strict';

(function () {

  window.configureNoticeForm();

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var mapSection = document.querySelector('.map');

    if (mapSection.className.indexOf('map--faded') !== -1) {
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
    }

    var startCoord = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoord.x - moveEvt.clientX,
        y: startCoord.y - moveEvt.clientY
      };

      startCoord = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (moveEvt.clientX < 300) {
        mainPin.style.left = '300px';
      } else if (moveEvt.clientX > 900) {
        mainPin.style.left = '900px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (moveEvt.clientY < 150) {
        mainPin.style.top = '150px';
      } else if (moveEvt.clientY > 500) {
        mainPin.style.top = '500px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      document.querySelector('#address').value = (mainPin.offsetLeft + mainPin.offsetWidth / 2)
          + ', ' + (mainPin.offsetTop + mainPin.offsetHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      mapSection.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    mapSection.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
