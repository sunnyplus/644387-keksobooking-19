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

  var renderCard = function (similarAd) { // функция генерации карточки
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var newCard = cardTemplate.cloneNode(true);
    newCard.querySelector('.popup__avatar').src = similarAd.author.avatar;
    newCard.querySelector('.popup__title').textContent = similarAd.author.offer.title;
    newCard.querySelector('.popup__text--address').textContent = similarAd.author.offer.address;
    newCard.querySelector('.popup__text--price').textContent = similarAd.author.offer.price + ' ₽';
    newCard.querySelector('.popup__text--price').append(document.createElement('span'));
    newCard.querySelector('span').textContent = '/ночь';
    newCard.querySelector('.popup__type').textContent = offerTypes[similarAd.author.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = similarAd.author.offer.rooms + ' комнаты для ' + similarAd.author.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'заезд после ' + similarAd.author.offer.checkin + ', выезд до ' + similarAd.author.offer.checkout;
    newCard.querySelector('.popup__features').remove(); // фичи
    var featuresList = createNode('ul', 'popup__features', similarAd.author.offer.features, 'li', 'popup__feature');
    newCard.querySelector('.popup__description').before(featuresList);
    newCard.querySelector('.popup__description').textContent = similarAd.author.offer.description;

    for (var i = 0; i < similarAd.author.offer.photos.length; i++) {
      var photoTemplate = newCard.querySelector('.popup__photo').cloneNode(true);
      photoTemplate.src = similarAd.author.offer.photos[i];
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
