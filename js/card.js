'use strict';

(function () {

  var offerTypes = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var mapFilters = document.querySelector('.map__filters-container'); // для показа объявления

  var createNode = function (nodeTag, nodeClass, array, childTag, childClass) { // создание дом узла и дочерних элементов с классами
    var newNode = document.createElement(nodeTag);
    newNode.classList.add(nodeClass);
    for (var f = 0; f < array.length; f++) {
      var newNodeChild = document.createElement(childTag);
      newNodeChild.className = childClass + ' ' + childClass + '--' + array[f];
      newNode.append(newNodeChild);
    }
    return newNode;
  };

  var renderCard = function () { // функция отрисовки карточки
    var fragmentCard = document.createDocumentFragment();
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    for (var n = 0; n < 1; n++) { // 1 => similarAds.length
      var newCard = cardTemplate.cloneNode(true);
      newCard.querySelector('.popup__avatar').src = window.data.similarAds[n].author.avatar;

      newCard.querySelector('.popup__title').textContent = window.data.similarAds[n].author.offer.title;
      newCard.querySelector('.popup__text--address').textContent = window.data.similarAds[n].author.offer.address;
      newCard.querySelector('.popup__text--price').textContent = window.data.similarAds[n].author.offer.price + ' ₽';
      newCard.querySelector('.popup__text--price').append(document.createElement('span'));
      newCard.querySelector('span').textContent = '/ночь';
      newCard.querySelector('.popup__type').textContent = offerTypes[window.data.similarAds[n].author.offer.type];
      newCard.querySelector('.popup__text--capacity').textContent = window.data.similarAds[n].author.offer.rooms + ' комнаты для ' + window.data.similarAds[n].author.offer.guests + ' гостей';
      newCard.querySelector('.popup__text--time').textContent = 'заезд после ' + window.data.similarAds[n].author.offer.checkin + ', выезд до ' + window.data.similarAds[n].author.offer.checkout;

      newCard.querySelector('.popup__features').remove(); // фичи
      var featuresList = createNode('ul', 'popup__features', window.data.similarAds[n].author.offer.features, 'li', 'popup__feature');
      newCard.querySelector('.popup__description').before(featuresList);

      newCard.querySelector('.popup__description').textContent = window.data.similarAds[n].author.offer.description;

      for (var d = 0; d < window.data.similarAds[n].author.offer.photos.length; d++) {
        var photoTemplate = newCard.querySelector('.popup__photo').cloneNode(true);
        photoTemplate.src = window.data.similarAds[n].author.offer.photos[d];
        var photoPopups = newCard.querySelector('.popup__photos');
        photoPopups.append(photoTemplate);
      }

      fragmentCard.append(newCard);
    }

    mapFilters.before(fragmentCard);
    document.querySelector('.popup__photo').remove();
  };

  window.card = {
    renderCard: renderCard,
    createNode: createNode
  };
})();
