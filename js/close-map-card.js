'use strict';

(function () {
  var mapSection = document.querySelector('.map');

  window.closeMapCard = function () {
    mapSection.removeChild(mapSection.querySelector('.map__card'));
    document.removeEventListener('keydown', window.onMapCardEscPress);
  };
})();

