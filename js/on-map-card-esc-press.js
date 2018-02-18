'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.onMapCardEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.closeMapCard();
    }
  };
})();


