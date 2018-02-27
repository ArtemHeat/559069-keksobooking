'use strict';
window.filtrateSimilarAds = function () {
  var form = document.querySelector('.map__filters');
  window.similarAds = [];

  var typeSelectValue = form.querySelector('#housing-type');
  var priceSelectValue = form.querySelector('#housing-price');
  var roomSelectValue = form.querySelector('#housing-rooms');
  var guestSelectValue = form.querySelector('#housing-guests');

  var wifiCheckboxValue = form.querySelector('#filter-wifi');
  var dishCheckboxValue = form.querySelector('#filter-dishwasher');
  var parkingCheckboxValue = form.querySelector('#filter-parking');
  var washerCheckboxValue = form.querySelector('#filter-washer');
  var elevatorCheckboxValue = form.querySelector('#filter-elevator');
  var conditionerCheckboxValue = form.querySelector('#filter-conditioner');

  var typeFilter = function (value) {
    return function (item) {
      if (value === 'any') {
        return true;
      } else {
        return item.offer.type === value;
      }
    };
  };

  var priceFilter = function (value) {
    return function (item) {
      if (value === 'any') {
        return true;
      } else if (value === 'middle') {
        return item.offer.price > 10000 && item.offer.price < 50000;
      } else if (value === 'low') {
        return item.offer.price < 10000;
      } else {
        return item.offer.price >= 50000;
      }
    };
  };

  var roomFilter = function (value) {
    return function (item) {
      if (value === 'any') {
        return true;
      } else {
        return item.offer.rooms === +value;
      }
    };
  };

  var guestFilter = function (value) {
    return function (item) {
      if (value === 'any') {
        return true;
      } else {
        return item.offer.guests === +value;
      }
    };
  };

  var wifiFilter = function (value) {
    return function (item) {
      if (value === 'true') {
        return item.offer.features.indexOf('wifi') !== -1;
      } else {
        return true;
      }
    };
  };

  var dishwasherFilter = function (value) {
    return function (item) {
      if (value === 'true') {
        return item.offer.features.indexOf('dishwasher') !== -1;
      } else {
        return true;
      }
    };
  };

  var parkingFilter = function (value) {
    return function (item) {
      if (value === 'true') {
        return item.offer.features.indexOf('parking') !== -1;
      } else {
        return true;
      }
    };
  };

  var washerFilter = function (value) {
    return function (item) {
      if (value === 'true') {
        return item.offer.features.indexOf('washer') !== -1;
      } else {
        return true;
      }
    };
  };

  var elevatorFilter = function (value) {
    return function (item) {
      if (value === 'true') {
        return item.offer.features.indexOf('elevator') !== -1;
      } else {
        return true;
      }
    };
  };

  var conditionerFilter = function (value) {
    return function (item) {
      if (value === 'true') {
        return item.offer.features.indexOf('conditioner') !== -1;
      } else {
        return true;
      }
    };
  };

  var allFilters = function (value1, value2, value3, value4, value5,
      value6, value7, value8, value9, value10) {
    return typeFilter(value1) && priceFilter(value2) && roomFilter(value3) &&
        guestFilter(value4) && wifiFilter(value5) && dishwasherFilter(value6) &&
        parkingFilter(value7) && washerFilter(value8) && elevatorFilter(value9) &&
        conditionerFilter(value10);
  };

  var updatePins = function () {

    window.fillMapPins(window.similarAds.slice().filter(allFilters(typeSelectValue.value,
        priceSelectValue.value, roomSelectValue.value, guestSelectValue.value, wifiCheckboxValue.checked,
        dishCheckboxValue.checked, parkingCheckboxValue.checked, washerCheckboxValue.checked,
        elevatorCheckboxValue.checked, conditionerCheckboxValue.checked)));
  };

  form.addEventListener('change', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'select' ||
      evt.target.tagName.toLowerCase() === 'input'
    ) {
      window.debounce(updatePins);
    }
  });
};
