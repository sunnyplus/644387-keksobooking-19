'use strict';

(function () {

  var offerTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var createNode = function (nodeTag, nodeClass, array, childTag, childClass) { // создание дом узла и дочерних элементов с классами
    var newNode = document.createElement(nodeTag);
    newNode.classList.add(nodeClass);

    array.forEach(function (element) {
      var newNodeChild = document.createElement(childTag);
      newNodeChild.className = childClass + ' ' + childClass + '--' + element;
      newNode.append(newNodeChild);
    });

    return newNode;
  };

  var checkDataAds = function (nodeElement, dataValue) {
    if (dataValue) {
      nodeElement.textContent = dataValue;
    } else {
      nodeElement.remove();
    }
  };

  var renderCard = function (similarAd) { // функция генерации карточки
    var newCard = document.querySelector('#card')
                  .content.querySelector('.map__card')
                  .cardTemplate.cloneNode(true);

    newCard.querySelector('.popup__avatar').src = similarAd.author.avatar;

    // if (similarAd.offer.title) {
    //   newCard.querySelector('.popup__title').textContent = similarAd.offer.title;
    // } else {
    //   newCard.querySelector('.popup__title').remove();
    // }

    checkDataAds(newCard.querySelector('.popup__title'), similarAd.offer.title);

    newCard.querySelector('.popup__text--address').textContent = similarAd.offer.address;
    newCard.querySelector('.popup__text--price').textContent = similarAd.offer.price + ' ₽';
    newCard.querySelector('.popup__text--price').append(document.createElement('span'));
    newCard.querySelector('span').textContent = '/ночь';
    newCard.querySelector('.popup__type').textContent = offerTypes[similarAd.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = similarAd.offer.rooms + ' комнаты для ' + similarAd.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'заезд после ' + similarAd.offer.checkin + ', выезд до ' + similarAd.offer.checkout;
    newCard.querySelector('.popup__features').remove(); // фичи
    var featuresList = createNode('ul', 'popup__features', similarAd.offer.features, 'li', 'popup__feature');
    newCard.querySelector('.popup__description').before(featuresList);
    newCard.querySelector('.popup__description').textContent = similarAd.offer.description;

    for (var i = 0; i < similarAd.offer.photos.length; i++) {
      var photoTemplate = newCard.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.src = similarAd.offer.photos[i];
      var photoPopups = newCard.querySelector('.popup__photos');
      photoPopups.append(photoTemplate);
    }

    return newCard;
  };

  window.card = {
    renderCard: renderCard,
    createNode: createNode
  };
})();
