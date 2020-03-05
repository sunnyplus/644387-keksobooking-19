'use strict';

(function () {

  var offerTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var renderCard = function (similarAd) { // функция генерации карточки
    var newCard = document.querySelector('#card')
                  .content.querySelector('.map__card')
                  .cloneNode(true);

    var createFeatures = function (nodeTag, nodeClass, array, childTag, childClass) { // создание дом узла и дочерних элементов с классами для
      if (array.length > 0) {
        newCard.querySelector('.popup__features').remove();
        var newNode = document.createElement(nodeTag);
        newNode.classList.add(nodeClass);

        array.forEach(function (element) {
          var newNodeChild = document.createElement(childTag);
          newNodeChild.className = childClass + ' ' + childClass + '--' + element;
          newNode.append(newNodeChild);
        });

        newCard.querySelector('.popup__description').before(newNode);
      }
    };

    var checkDataAds = function (checkElement, checkValue, value) {
      if (checkValue) {
        checkElement.textContent = value;
      } else {
        checkElement.remove();
      }
    };

    var checkDoubleDataAds = function (checkElement, checkFirstValue, checkSecondValue, value) {
      if (checkFirstValue && checkSecondValue) {
        checkElement.textContent = value;
      } else {
        checkElement.remove();
      }
    };

    newCard.querySelector('.popup__avatar').src = similarAd.author.avatar;

    checkDataAds(newCard.querySelector('.popup__title'), similarAd.offer.title, similarAd.offer.title); // проверяем наличие свойства title
    checkDataAds(newCard.querySelector('.popup__text--address'), similarAd.offer.address, similarAd.offer.address); // проверяем наличие свойства address
    checkDataAds(newCard.querySelector('.popup__description'), similarAd.offer.description, similarAd.offer.description); // проверяем наличие свойства description
    checkDataAds(newCard.querySelector('.popup__type'), similarAd.offer.type, offerTypes[similarAd.offer.type]); // проверяем наличие свойства type

    if (similarAd.offer.price) { // проверяем наличие свойства price
      newCard.querySelector('.popup__text--price').textContent = similarAd.offer.price + ' ₽';
      newCard.querySelector('.popup__text--price').append(document.createElement('span'));
      newCard.querySelector('span').textContent = '/ночь';
    } else {
      newCard.querySelector('.popup__text--price').remove();
    }

    checkDoubleDataAds(newCard.querySelector('.popup__text--time'), similarAd.offer.checkin, similarAd.offer.checkout, 'заезд после ' + similarAd.offer.checkin + ', выезд до ' + similarAd.offer.checkout); // проверяем наличие свойств checkin и checkout

    checkDoubleDataAds(newCard.querySelector('.popup__text--capacity'), similarAd.offer.rooms, similarAd.offer.guests, similarAd.offer.rooms + ' комнаты для ' + similarAd.offer.guests + ' гостей'); // проверяем наличие свойств guests и rooms

    createFeatures('ul', 'popup__features', similarAd.offer.features, 'li', 'popup__feature'); // проверяем наличие свойства features и создаём узел

    if (similarAd.offer.photos.length > 0) { // проверяем наличие свойства photos
      for (var i = 0; i < similarAd.offer.photos.length; i++) {
        var photoTemplate = newCard.querySelector('.popup__photo').cloneNode(true);
        photoTemplate.src = similarAd.offer.photos[i];
        var photoPopups = newCard.querySelector('.popup__photos');
        photoPopups.append(photoTemplate);
      }
    }

    return newCard;
  };

  window.card = {
    renderCard: renderCard,
    offerTypes: offerTypes
  };
})();
