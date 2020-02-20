'use strict';

(function () {

  var AD_COUNT = 1;

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

  var renderCard = function () { // функция генерации карточки
    var fragmentCard = document.createDocumentFragment();
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var similarAds = window.data.getSimilarAds();

    for (var i = 0; i < AD_COUNT; i++) { // 1 => similarAds.length
      var newCard = cardTemplate.cloneNode(true);
      newCard.querySelector('.popup__avatar').src = similarAds[i].author.avatar;

      newCard.querySelector('.popup__title').textContent = similarAds[i].author.offer.title;
      newCard.querySelector('.popup__text--address').textContent = similarAds[i].author.offer.address;
      newCard.querySelector('.popup__text--price').textContent = similarAds[i].author.offer.price + ' ₽';
      newCard.querySelector('.popup__text--price').append(document.createElement('span'));
      newCard.querySelector('span').textContent = '/ночь';
      newCard.querySelector('.popup__type').textContent = offerTypes[similarAds[i].author.offer.type];
      newCard.querySelector('.popup__text--capacity').textContent = similarAds[i].author.offer.rooms + ' комнаты для ' + similarAds[i].author.offer.guests + ' гостей';
      newCard.querySelector('.popup__text--time').textContent = 'заезд после ' + similarAds[i].author.offer.checkin + ', выезд до ' + similarAds[i].author.offer.checkout;

      newCard.querySelector('.popup__features').remove(); // фичи
      var featuresList = createNode('ul', 'popup__features', similarAds[i].author.offer.features, 'li', 'popup__feature');
      newCard.querySelector('.popup__description').before(featuresList);

      newCard.querySelector('.popup__description').textContent = similarAds[i].author.offer.description;

      for (var d = 0; d < similarAds[i].author.offer.photos.length; d++) {
        var photoTemplate = newCard.querySelector('.popup__photo').cloneNode(true);
        photoTemplate.src = similarAds[i].author.offer.photos[d];
        var photoPopups = newCard.querySelector('.popup__photos');
        photoPopups.append(photoTemplate);
      }

      fragmentCard.append(newCard);
    }

    return fragmentCard;
  };

  window.card = {
    renderCard: renderCard,
    createNode: createNode
  };
})();
