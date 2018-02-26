'use strict';
window.filtrateSimilarAds = function () {
  // var typeFiltrator;
  // var priceFiltrator;
  // var roomFiltrator;
  // var guestFiltrator;
  // var wifiFiltrator;
  // var dishwasherFiltrator;
  // var parkingFiltrator;
  // var washerFiltrator;
  // var elevatorFiltrator;
  // var conditionerFiltrator;
  var form = document.querySelector('.map__filters');
  window.similarAds = [];

  var typeSelectValueToTypeFilter = {
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

  var priceSelectValueToPriceFilter = {
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

  var roomSelectValueToRoomFilter = {
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

  var guestSelectValueToGuestFilter = {
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

  var wifiCheckboxValueToWifiFilter = {
    'true': function (item) {
      return item.offer.features.indexOf('wifi') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var dishCheckboxValueToDishFilter = {
    'true': function (item) {
      return item.offer.features.indexOf('dishwasher') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var parkingCheckboxValueToParkingFilter = {
    'true': function (item) {
      return item.offer.features.indexOf('parking') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var washerCheckboxValueToWasherFilter = {
    'true': function (item) {
      return item.offer.features.indexOf('washer') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var elevatorCheckboxValueToElevatorFilter = {
    'true': function (item) {
      return item.offer.features.indexOf('elevator') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var conderCheckboxValueToConderFilter = {
    'true': function (item) {
      return item.offer.features.indexOf('conditioner') !== -1;
    },
    'false': function () {
      return true;
    }
  };

  var updatePins = function () {
    var typeFilter = typeSelectValueToTypeFilter[form.
        querySelector('#housing-type').value];
    var priceFilter = priceSelectValueToPriceFilter[form.
        querySelector('#housing-price').value];
    var roomFilter = roomSelectValueToRoomFilter[form.
        querySelector('#housing-rooms').value];
    var guestFilter = guestSelectValueToGuestFilter[form.
        querySelector('#housing-guests').value];

    var wifiFilter = wifiCheckboxValueToWifiFilter[form.
        querySelector('#filter-wifi').checked];
    var dishwasherFilter = dishCheckboxValueToDishFilter[form.
        querySelector('#filter-dishwasher').checked];
    var parkingFilter = parkingCheckboxValueToParkingFilter[form.
        querySelector('#filter-parking').checked];
    var washerFilter = washerCheckboxValueToWasherFilter[form.
        querySelector('#filter-washer').checked];
    var elevatorFilter = elevatorCheckboxValueToElevatorFilter[form.
        querySelector('#filter-elevator').checked];
    var conditionerFilter = conderCheckboxValueToConderFilter[form.
        querySelector('#filter-conditioner').checked];

    var allFilters = function (item) {
      return typeFilter(item) && priceFilter(item) && roomFilter(item) &&
        guestFilter(item) && wifiFilter(item) && dishwasherFilter(item) &&
        parkingFilter(item) && washerFilter(item) && elevatorFilter(item) && conditionerFilter(item);
    };

    window.fillMapPins(window.similarAds.slice().filter(allFilters));
  };

  form.addEventListener('change', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'select' ||
      evt.target.tagName.toLowerCase() === 'input'
    ) {
      window.debounce(updatePins);
    }
  });
};
