'use strict';

(function () {
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x - pinElement.offsetWidth / 2 + 'px';
    pinElement.style.top = pin.location.y - pinElement.offsetHeight + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    return pinElement;
  };

  var setupPinHandler = function (pin, ad) {
    var onPinClick = function () {
      window.openMapCard(ad);
    };
    return pin.addEventListener('click', onPinClick);
  };

  window.fillMapPins = function (ads) {
    var mapPins = document.querySelectorAll('.map__pin');

    for (var i = 1; i < mapPins.length; i++) {
      document.querySelector('.map__pins').removeChild(mapPins[i]);
    }

    var fragment = document.createDocumentFragment();
    var pin;

    var numberOfPins = Math.min(5, ads.length);

    for (i = 0; i < numberOfPins; i++) {
      pin = renderPin(ads[i]);
      setupPinHandler(pin, ads[i]);
      fragment.appendChild(pin);
    }
    return document.querySelector('.map__pins').appendChild(fragment);
  };
})();


