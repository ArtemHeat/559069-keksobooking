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

  window.fillMapPins = function (list, ads) {
    var fragment = document.createDocumentFragment();
    var pin;
    for (var i = 0; i < ads.length; i++) {
      pin = renderPin(ads[i]);
      setupPinHandler(pin, ads[i]);
      fragment.appendChild(pin);
    }
    return list.appendChild(fragment);
  };
})();


