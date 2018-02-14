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
var ESC_KEYCODE = 27;

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

var ads = Array(8).fill(0).map(function (_, i) {
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
      checkin: getRandomData(CHECKIN_TIME),
      checkout: getRandomData(CHECKOUT_TIME),
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

var mapSection = document.querySelector('.map');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x - pinElement.offsetWidth / 2 + 'px';
  pinElement.style.top = pin.location.y - pinElement.offsetHeight + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  return pinElement;
};

var onMapCardEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeMapCard();
  }
};

var closeMapCard = function () {
  mapSection.removeChild(mapSection.querySelector('.map__card'));
  document.removeEventListener('keydown', onMapCardEscPress);
};

var openMapCard = function (ad) {
  if (mapSection.querySelector('.map__card')) {
    closeMapCard();
  }
  mapSection.insertBefore(renderMapCard(ad), mapSection.querySelector('.map__filters-container'));
  document.addEventListener('keydown', onMapCardEscPress);

  var cardCloseBtn = mapSection.querySelector('.map__card .popup__close');
  cardCloseBtn.addEventListener('click', function () {
    closeMapCard();
  });
};

var setupPinHandler = function (pin, ad) {
  var onPinClick = function () {
    openMapCard(ad);
  };
  return pin.addEventListener('click', onPinClick);
};

var fillMapPins = function (list) {
  var fragment = document.createDocumentFragment();
  var pin;
  for (var i = 0; i < ads.length; i++) {
    pin = renderPin(ads[i]);
    setupPinHandler(pin, ads[i]);
    fragment.appendChild(pin);
  }
  return list.appendChild(fragment);
};

var createFeatureItem = function (feature) {
  var featureItem = document.createElement('li');
  featureItem.className = 'feature feature--' + feature;

  return featureItem;
};

var fillFeatureList = function (list, arr) {
  var fragment = document.createDocumentFragment();
  list.innerHTML = '';
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createFeatureItem(arr[i]));
  }
  return list.appendChild(fragment);
};

var createPhotoItem = function (image, arr) {
  var photoItem = document.createElement('li');
  var imgElement = document.createElement('img');
  imgElement.src = image;
  imgElement.style.width = Math.floor(100 / arr.length) + '%';
  imgElement.style.height = 'auto';
  photoItem.style.display = 'inline';
  photoItem.appendChild(imgElement);

  return photoItem;
};

var fillPhotoList = function (list, arr) {
  var fragment = document.createDocumentFragment();
  list.innerHTML = '';
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createPhotoItem(arr[i], arr));
  }
  return list.appendChild(fragment);
};

var getApartmentType = function (ad) {
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

  return apartmentType;
};

var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

var renderMapCard = function (ad) {
  var mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector('h3').textContent = ad.offer.title;
  mapCard.querySelector('p small').textContent = ad.offer.address;
  mapCard.querySelector('.popup__price').textContent = ad.offer.price + '\u20bd/ночь';
  mapCard.querySelector('h4').textContent = getApartmentType(ad);
  mapCard.querySelector('h4 + p').textContent = ad.offer.rooms +
      ' комнаты для ' + ad.offer.guests + ' гостей';
  mapCard.querySelector('h4 + p + p').textContent = 'Заезд после '
      + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  fillFeatureList(mapCard.querySelector('.popup__features'), ad.offer.features);
  mapCard.querySelector('.popup__features + p').textContent = ad.offer.description;
  fillPhotoList(mapCard.querySelector('.popup__pictures'), ad.offer.photos);
  mapCard.querySelector('.popup__avatar').src = ad.author.avatar;
  return mapCard;
};

var noticeFormFieldsets = document.querySelectorAll('.notice__form fieldset');

for (var i = 0; i < noticeFormFieldsets.length; i++) {
  noticeFormFieldsets[i].disabled = true;
}

var mainPin = document.querySelector('.map__pin--main');

document.querySelector('#address').value = (mainPin.offsetLeft + mainPin.offsetWidth / 2)
    + ', ' + (mainPin.offsetTop + mainPin.offsetHeight / 2);

var onMainPinClick = function () {
  mapSection.classList.remove('map--faded');
  document.querySelector('.notice__form').classList.remove('notice__form--disabled');

  for (i = 0; i < noticeFormFieldsets.length; i++) {
    noticeFormFieldsets[i].disabled = false;
  }

  document.querySelector('#address').value = (mainPin.offsetLeft + mainPin.offsetWidth / 2)
      + ', ' + (mainPin.offsetTop + mainPin.offsetHeight);

  fillMapPins(document.querySelector('.map__pins'));
  mainPin.removeEventListener('mouseup', onMainPinClick);
};

mainPin.addEventListener('mouseup', onMainPinClick);
