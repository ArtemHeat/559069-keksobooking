'use strict';

(function () {
  var AVATARS = [
    'img/avatars/user01.png',
    'img/avatars/user02.png',
    'img/avatars/user03.png',
    'img/avatars/user04.png',
    'img/avatars/user05.png',
    'img/avatars/user06.png',
    'img/avatars/user07.png',
    'img/avatars/user08.png'
  ];
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = [
    'flat',
    'house',
    'bungalo'
  ];
  var CHECKIN_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var CHECKOUT_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var ALL_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var ALL_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 0;
  var MAX_GUESTS = 10;
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 150;
  var MAX_Y = 500;

  var getRandomData = function (arr) {
    var randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
  };

  var getRandomNumber = function (from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  };

  var sortRandom = function () {
    return Math.random() - 0.5;
  };

  var randomAvatar = AVATARS.slice().sort(sortRandom);
  var randomTitle = TITLES.slice().sort(sortRandom);

  window.ads = Array(8).fill(0).map(function (_, i) {
    var locationX = getRandomNumber(MIN_X, MAX_X);
    var locationY = getRandomNumber(MIN_Y, MAX_Y);

    return {
      author: {avatar: randomAvatar[i]},
      offer: {
        title: randomTitle[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomData(TYPES),
        rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomData(CHECKIN_TIMES),
        checkout: getRandomData(CHECKOUT_TIMES),
        features: ALL_FEATURES.slice().sort(sortRandom).splice(0,
            getRandomNumber(0, ALL_FEATURES.length)),
        description: '',
        photos: ALL_PHOTOS.slice().sort(sortRandom)
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  });
})();

