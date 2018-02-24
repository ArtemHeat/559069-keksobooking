'use strict';
window.filtrateSimilarAds = function () {
  var typeFiltrator;
  var priceFiltrator;
  var roomFiltrator;
  var guestFiltrator;
  var wifiFiltrator;
  var dishwasherFiltrator;
  var parkingFiltrator;
  var washerFiltrator;
  var elevatorFiltrator;
  var conditionerFiltrator;
  var form = document.querySelector('.map__filters');
  window.similarAds = [];

  var updatePins = function () {
    typeFiltrator = typeSelectValueToTypeFiltrator[form.
        querySelector('#housing-type').value];
    priceFiltrator = priceSelectValueToPriceFiltrator[form.
        querySelector('#housing-price').value];
    roomFiltrator = roomSelectValueToRoomFiltrator[form.
        querySelector('#housing-rooms').value];
    guestFiltrator = guestSelectValueToGuestFiltrator[form.
        querySelector('#housing-guests').value];

    wifiFiltrator = wifiCheckboxValueToWifiFiltrator[form.
        querySelector('#filter-wifi').checked];
    dishwasherFiltrator = dishCheckboxValueToDishFiltrator[form.
        querySelector('#filter-dishwasher').checked];
    parkingFiltrator = parkingCheckboxValueToParkingFiltrator[form.
        querySelector('#filter-parking').checked];
    washerFiltrator = washerCheckboxValueToWasherFiltrator[form.
        querySelector('#filter-washer').checked];
    elevatorFiltrator = elevatorCheckboxValueToElevatorFiltrator[form.
        querySelector('#filter-elevator').checked];
    conditionerFiltrator = conderCheckboxValueToConderFiltrator[form.
        querySelector('#filter-conditioner').checked];

    window.fillMapPins(window.similarAds.slice().
        filter(typeFiltrator).filter(priceFiltrator).
        filter(roomFiltrator).filter(guestFiltrator).
        filter(wifiFiltrator).filter(dishwasherFiltrator).
        filter(parkingFiltrator).filter(washerFiltrator).
        filter(elevatorFiltrator).filter(conditionerFiltrator));
  };

  var typeSelectValueToTypeFiltrator = {
    'any': function () {
      return true;
    },
    'flat': function (item) {
      return item.offer.type === 'flat';
    },
    'house': function (item) {
      return item.offer.type === 'house';
    },
    'bungalo': function (item) {
      return item.offer.type === 'bungalo';
    }
  };

  var priceSelectValueToPriceFiltrator = {
    'any': function () {
      return true;
    },
    'middle': function (item) {
      return item.offer.price > 10000 ||
        item.offer.price < 50000;
    },
    'low': function (item) {
      return item.offer.price < 10000;
    },
    'high': function (item) {
      return item.offer.price >= 50000;
    }
  };

  var roomSelectValueToRoomFiltrator = {
    'any': function () {
      return true;
    },
    '1': function (item) {
      return item.offer.rooms === 1;
    },
    '2': function (item) {
      return item.offer.rooms === 2;
    },
    '3': function (item) {
      return item.offer.rooms === 3;
    }
  };

  var guestSelectValueToGuestFiltrator = {
    'any': function () {
      return true;
    },
    '1': function (item) {
      return item.offer.guests === 1;
    },
    '2': function (item) {
      return item.offer.guests === 2;
    }
  };

  var wifiCheckboxValueToWifiFiltrator = {
    'true': function (item) {
      return item.offer.features.indexOf('wifi') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var dishCheckboxValueToDishFiltrator = {
    'true': function (item) {
      return item.offer.features.indexOf('dishwasher') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var parkingCheckboxValueToParkingFiltrator = {
    'true': function (item) {
      return item.offer.features.indexOf('parking') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var washerCheckboxValueToWasherFiltrator = {
    'true': function (item) {
      return item.offer.features.indexOf('washer') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var elevatorCheckboxValueToElevatorFiltrator = {
    'true': function (item) {
      return item.offer.features.indexOf('elevator') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var conderCheckboxValueToConderFiltrator = {
    'true': function (item) {
      return item.offer.features.indexOf('conditioner') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  form.addEventListener('change', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'select' ||
      evt.target.tagName.toLowerCase() === 'input'
    ) {
      window.debounce(updatePins);
    }
  });
};
