'use strict';
window.filtrateSimilarAds = function () {
  var form = document.querySelector('.map__filters');
  window.similarAds = [];

  var typeSelect = form.querySelector('#housing-type');
  var priceSelect = form.querySelector('#housing-price');
  var roomSelect = form.querySelector('#housing-rooms');
  var guestSelect = form.querySelector('#housing-guests');

  var wifiCheckbox = form.querySelector('#filter-wifi');
  var dishwasherCheckbox = form.querySelector('#filter-dishwasher');
  var parkingCheckbox = form.querySelector('#filter-parking');
  var washerCheckbox = form.querySelector('#filter-washer');
  var elevatorCheckbox = form.querySelector('#filter-elevator');
  var conditionerCheckbox = form.querySelector('#filter-conditioner');

  var typeFilter = function (item) {
    if (typeSelect.value === 'any') {
      return true;
    } else {
      return item.offer.type === typeSelect.value;
    }
  };

  var priceFilter = function (item) {
    if (priceSelect.value === 'any') {
      return true;
    } else if (priceSelect.value === 'middle') {
      return item.offer.price > 10000 && item.offer.price < 50000;
    } else if (priceSelect.value === 'low') {
      return item.offer.price < 10000;
    } else {
      return item.offer.price >= 50000;
    }
  };

  var roomFilter = function (item) {
    if (roomSelect.value === 'any') {
      return true;
    } else {
      return item.offer.rooms === +roomSelect.value;
    }
  };

  var guestFilter = function (item) {
    if (guestSelect.value === 'any') {
      return true;
    } else {
      return item.offer.guests === +guestSelect.value;
    }
  };

  var wifiFilter = function (item) {
    if (wifiCheckbox.checked === true) {
      return item.offer.features.indexOf('wifi') !== -1;
    } else {
      return true;
    }
  };

  var dishwasherFilter = function (item) {
    if (dishwasherCheckbox.checked === true) {
      return item.offer.features.indexOf('dishwasher') !== -1;
    } else {
      return true;
    }
  };

  var parkingFilter = function (item) {
    if (parkingCheckbox.checked === true) {
      return item.offer.features.indexOf('parking') !== -1;
    } else {
      return true;
    }
  };

  var washerFilter = function (item) {
    if (washerCheckbox.checked === true) {
      return item.offer.features.indexOf('washer') !== -1;
    } else {
      return true;
    }
  };

  var elevatorFilter = function (item) {
    if (elevatorCheckbox.checked === true) {
      return item.offer.features.indexOf('elevator') !== -1;
    } else {
      return true;
    }
  };

  var conditionerFilter = function (item) {
    if (conditionerCheckbox.checked === true) {
      return item.offer.features.indexOf('conditioner') !== -1;
    } else {
      return true;
    }
  };

  var allFilters = function (item) {
    return typeFilter(item) && priceFilter(item) && roomFilter(item) &&
        guestFilter(item) && wifiFilter(item) && dishwasherFilter(item) &&
        parkingFilter(item) && washerFilter(item) && elevatorFilter(item) &&
        conditionerFilter(item);
  };

  var updatePins = function () {
    window.fillMapPins(window.similarAds.slice().filter(allFilters));
  };

  form.addEventListener('change', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'select' ||
      evt.target.tagName.toLowerCase() === 'input'
    ) {
      window.closeMapCard();
      window.debounce(updatePins);
    }
  });
};
