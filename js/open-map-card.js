'use strict';

(function () {
  var mapSection = document.querySelector('.map');

  window.openMapCard = function (ad) {
    if (mapSection.querySelector('.map__card')) {
      window.closeMapCard();
    }
    mapSection.insertBefore(renderMapCard(ad), mapSection.querySelector('.map__filters-container'));
    document.addEventListener('keydown', window.onMapCardEscPress);

    var cardCloseBtn = mapSection.querySelector('.map__card .popup__close');
    cardCloseBtn.addEventListener('click', function () {
      window.closeMapCard();
    });
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

    if (mapCard.querySelector('.popup__features').innerHTML === '') {
      mapCard.removeChild(mapCard.querySelector('.popup__features'));
    }

    return mapCard;
  };
})();
