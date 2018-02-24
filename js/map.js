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

      // window.fillMapPins(document.querySelector('.map__pins'));

      window.backend.load(successLoadHandler, errorLoadHandler);
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

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

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

  // Загрузка пинов

  var successLoadHandler = function (ads) {
    window.fillMapPins(ads);
    window.similarAds = ads;
  };

  var errorLoadHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Фильтр похожих объявлений

  window.filtrateSimilarAds();
})();
