'use strict';

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
var CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUT_TIME = [
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
var ADJUSTMENT_Y = 35;

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
var locationX = Array(8).fill(0).map(function () {
  return getRandomNumber(MIN_X, MAX_X);
});
var locationY = Array(8).fill(0).map(function () {
  return getRandomNumber(MIN_Y, MAX_Y);
});

var ads = Array(8).fill(0).map(function (_, i) {
  return {
    author: {avatar: randomAvatar[i]},
    offer: {
      title: randomTitle[i],
      address: locationX[i] + ', ' + locationY[i],
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getRandomData(TYPES),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomData(CHECKIN_TIME),
      checkout: getRandomData(CHECKOUT_TIME),
      features: ALL_FEATURES.slice().sort(sortRandom).splice(0,
          getRandomNumber(0, ALL_FEATURES.length)),
      description: '',
      photos: ALL_PHOTOS.slice().sort(sortRandom)
    },
    location: {
      x: locationX[i],
      y: locationY[i]
    }
  };
});

var mapSection = document.querySelector('.map');
mapSection.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + 'px';
  pinElement.style.top = pin.location.y - ADJUSTMENT_Y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  return pinElement;
};

var fillMapPins = function (list) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  return list.appendChild(fragment);
};

fillMapPins(mapSection.querySelector('.map__pins'));

var fillFeatureList = function (list, ad) {
  var fragment = document.createDocumentFragment();
  list.innerHTML = '';
  for (var i = 0; i < ad.offer.features.length; i++) {
    var featureItem = document.createElement('li');
    featureItem.className = 'feature feature--' + ad.offer.features[i];
    fragment.appendChild(featureItem);
  }
  return list.appendChild(fragment);
};

var fillPhotoList = function (list, ad) {
  var fragment = document.createDocumentFragment();
  list.innerHTML = '';
  for (var i = 0; i < ad.offer.photos.length; i++) {
    var photoItem = document.createElement('li');
    var imgElement = document.createElement('img');
    imgElement.src = ad.offer.photos[i];
    imgElement.style.width = '100%';
    imgElement.style.height = 'auto';
    photoItem.appendChild(imgElement);
    fragment.appendChild(photoItem);
  }
  return list.appendChild(fragment);
};

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderMapCard = function (ad) {
  var mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector('h3').textContent = ad.offer.title;
  mapCard.querySelector('p small').textContent = ad.offer.address;
  mapCard.querySelector('.popup__price').textContent = ad.offer.price + '\u20bd/ночь';
  var apartmentType;
  if (ad.offer.type === 'flat') {
    apartmentType = 'Квартира';
  } else if (ad.offer.type === 'house') {
    apartmentType = 'Дом';
  } else if (ad.offer.type === 'bungalo') {
    apartmentType = 'Бунгало';
  } else {
    apartmentType = 'Тип неизвестен';
  }
  mapCard.querySelector('h4').textContent = apartmentType;
  mapCard.querySelector('h4 + p').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  fillFeatureList(mapCard.querySelector('.popup__features'), ad);
  mapCard.querySelector('.popup__features + p').textContent = ad.offer.description;
  fillPhotoList(mapCard.querySelector('.popup__pictures'), ad);
  mapCard.querySelector('.popup__avatar').src = ad.author.avatar;
  return mapCard;
};

mapSection.insertBefore(renderMapCard(ads[0]), mapSection.querySelector('.map__filters-container'));
