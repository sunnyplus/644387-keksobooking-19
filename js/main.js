'use strict';

var AD_AMOUNT = 8;

var PIN_POINTER_HEIGHT = 22;

// var offerTypes = {
//   flat: 'Квартира',
//   bungalo: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец'
// };

var adForm = document.querySelector('.ad-form');

var addressField = document.querySelector('#address');
var mapPin = document.querySelector('.map__pin--main'); // главная метка
var findAddress = function (pin, active) { // функция определения координат метки в активном (true) и неактивном (false) состоянии.
  if (active === true) {
    var pinOffsetY = pin.offsetHeight + PIN_POINTER_HEIGHT;
  } else {
    pinOffsetY = pin.offsetHeight / 2;
  }
  return {
    left: Math.floor(pin.offsetLeft + pin.offsetWidth / 2),
    top: Math.floor(pin.offsetTop + pinOffsetY)
  };
};

var mainPinAddress = findAddress(mapPin, false);
addressField.value = mainPinAddress.left + ', ' + mainPinAddress.top; // выставляем координаты метки в неактивном состоянии

var pageDeactivate = function (flag) {
  var fieldsetCollection = document.querySelectorAll('form fieldset');
  fieldsetCollection.forEach(function (element) {
    element.disabled = flag;
  });
};

var pageActivate = function () {
  pageDeactivate(false);
  renderSimilarAds();
  checkCapacityValidity(); // проверка на валидность поля capacity (кол-во гостей)
  adForm.classList.remove('ad-form--disabled');
  document.querySelector('.map').classList.remove('map--faded');
  mainPinAddress = findAddress(mapPin, true); // координаты метки в активном состоянии
  addressField.value = mainPinAddress.left + ', ' + mainPinAddress.top;
};

pageDeactivate(true);

var getSimilarAds = function () {
  var similarAds = [];
  for (var k = 1; k <= AD_AMOUNT; k++) {
    similarAds.push(getSimilarAd(k));
  }
  return similarAds;
};

var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');

var checkCapacityValidity = function () {
  if ((parseInt(roomNumber.value, 10) !== 100 && parseInt(capacity.value, 10) === 0)
    || (parseInt(roomNumber.value, 10) === 100 && parseInt(capacity.value, 10) !== 0)
    || (parseInt(roomNumber.value, 10) < parseInt(capacity.value, 10))) {
    capacity.setCustomValidity('выбранное количество гостей не подходит под количество комнат');
  } else {
    capacity.setCustomValidity('');
  }
};

var onFieldChange = function () {
  checkCapacityValidity();
};

var onFormSend = function () {
  checkCapacityValidity();
};


// var mapFilters = document.querySelector('.map__filters-container'); // для показа объявления

var similarAds = getSimilarAds();

var renderSimilarAds = function () { // функция отрисовки похожих объявлений
  var mapPins = document.querySelector('.map__pins');

  var fragmentPin = document.createDocumentFragment();

  for (var t = 0; t < similarAds.length; t++) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
    var offsetX = similarAds[t].author.location.x - pinTemplate.offsetWidth / 2;
    var offsetY = similarAds[t].author.location.y - pinTemplate.offsetHeight;
    pinTemplate.style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px';
    pinTemplate.querySelector('img').src = similarAds[t].author.avatar;
    pinTemplate.querySelector('img').alt = similarAds[t].author.offer.title;
    fragmentPin.append(pinTemplate);
  }

  mapPins.append(fragmentPin);
};


// var createNode = function (nodeTag, nodeClass, array, childTag, childClass) { // создание дом узла и дочерних элементов с классами
//   var newNode = document.createElement(nodeTag);
//   newNode.classList.add(nodeClass);
//   for (var f = 0; f < array.length; f++) {
//     var newNodeChild = document.createElement(childTag);
//     newNodeChild.className = childClass + ' ' + childClass + '--' + array[f];
//     newNode.append(newNodeChild);
//   }
//   return newNode;
// };

// var renderCard = function () { // функция отрисовки карточки
//   var fragmentCard = document.createDocumentFragment();
//   var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

//   for (var n = 0; n < 1; n++) { // 1 => similarAds.length
//     var newCard = cardTemplate.cloneNode(true);
//     newCard.querySelector('.popup__avatar').src = similarAds[n].author.avatar;

//     newCard.querySelector('.popup__title').textContent = similarAds[n].author.offer.title;
//     newCard.querySelector('.popup__text--address').textContent = similarAds[n].author.offer.address;
//     newCard.querySelector('.popup__text--price').textContent = similarAds[n].author.offer.price + ' ₽';
//     newCard.querySelector('.popup__text--price').append(document.createElement('span'));
//     newCard.querySelector('span').textContent = '/ночь';
//     newCard.querySelector('.popup__type').textContent = offerTypes[similarAds[n].author.offer.type];
//     newCard.querySelector('.popup__text--capacity').textContent = similarAds[n].author.offer.rooms + ' комнаты для ' + similarAds[n].author.offer.guests + ' гостей';
//     newCard.querySelector('.popup__text--time').textContent = 'заезд после ' + similarAds[n].author.offer.checkin + ', выезд до ' + similarAds[n].author.offer.checkout;

//     newCard.querySelector('.popup__features').remove(); // фичи
//     var featuresList = createNode('ul', 'popup__features', similarAds[n].author.offer.features, 'li', 'popup__feature');
//     newCard.querySelector('.popup__description').before(featuresList);

//     newCard.querySelector('.popup__description').textContent = similarAds[n].author.offer.description;

//     for (var d = 0; d < similarAds[n].author.offer.photos.length; d++) {
//       var photoTemplate = newCard.querySelector('.popup__photo').cloneNode(true);
//       photoTemplate.src = similarAds[n].author.offer.photos[d];
//       var photoPopups = newCard.querySelector('.popup__photos');
//       photoPopups.append(photoTemplate);
//     }

//     fragmentCard.append(newCard);
//   }

//   mapFilters.before(fragmentCard);
//   document.querySelector('.popup__photo').remove();
// };

mapPin.addEventListener('mousedown', function (evt) { // обработчик клика на главную метку
  if (evt.button === 0) {
    pageActivate();
  }
});

mapPin.addEventListener('keydown', function (evt) { // обработчик нажатия на главную метку
  if (evt.key === 'Enter') {
    pageActivate();
  }
});

capacity.addEventListener('change', onFieldChange); // событие изменение количества гостей
roomNumber.addEventListener('change', onFieldChange); // событие изменение количества комнат
adForm.addEventListener('submit', onFormSend); // событие отправки формы

