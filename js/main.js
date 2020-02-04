'use strict';

var AD_AMOUNT = 8;

var PRICE_MIN = 5000;
var PRICE_MAX = 55000;

var GUESTS_MIN = 1;
var GUESTS_MAX = 5;

var ROOMS_MIN = 1;
var ROOMS_MAX = 5;

var IMAGES_MAX = 3;

var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var TITLES = [
  '',
  '',
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке'
];
var ADDRESSES = [
  '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
  'Chiyoda-ku, Tōkyō-to 102-0091',
  '1-1 Chiyoda, Chiyoda-ku, Tōkyō-to 100-8111'
];
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var DESCRIPTIONS = [
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.'
];

var getSimilarAds = function () {
  var similarAds = [];
  for (var k = 1; k <= AD_AMOUNT; k++) {
    similarAds.push(getSimilarAd(k));
  }
  return similarAds;
};

var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var mapFilters = document.querySelector('.map__filters-container');

var getRandomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomImages = function (count) {
  var randomArray = [];
  for (var i = 1; i < getRandomRange(1, count); i++) {
    randomArray.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return randomArray;
};

var shuffleArray = function (array) {
  var j;
  var x;
  var i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

var getRandomFeatures = function (array) {
  var featuresCount = getRandomRange(0, array.length);
  shuffleArray(FEATURES);
  return array.slice(featuresCount);
};

var getSimilarAd = function (userNumber) {
  return {
    author: {
      avatar: 'img/avatars/user0' + userNumber + '.png',
      offer: {
        title: getRandomElement(TITLES),
        address: getRandomElement(ADDRESSES),
        price: getRandomRange(PRICE_MIN, PRICE_MAX),
        type: getRandomElement(TYPES),
        rooms: getRandomRange(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomRange(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomElement(CHECKINS),
        checkout: getRandomElement(CHECKOUTS),
        features: getRandomFeatures(FEATURES),
        description: getRandomElement(DESCRIPTIONS),
        photos: getRandomImages(IMAGES_MAX)
      },
      location: {
        x: getRandomRange(0, mapWidth),
        y: getRandomRange(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    }
  };
};

var similarAds = getSimilarAds();

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

var fragmentCard = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

for (var n = 0; n < 1; n++) { // 1 => similarAds.length
  var newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.popup__avatar').src = similarAds[n].author.avatar;

  newCard.querySelector('.popup__title').textContent = similarAds[n].author.offer.title;
  newCard.querySelector('.popup__text--address').textContent = similarAds[n].author.offer.address;
  newCard.querySelector('.popup__text--price').textContent = similarAds[n].author.offer.price + ' ₽';
  newCard.querySelector('.popup__text--price').append(document.createElement('span'));
  newCard.querySelector('span').textContent = '/ночь';
  switch (similarAds[n].author.offer.type) {
    case 'bungalo':
      newCard.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'flat':
      newCard.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'house':
      newCard.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      newCard.querySelector('.popup__type').textContent = 'Дворец';
      break;
  }
  // newCard.querySelector('.popup__type').textContent = similarAds[n].author.offer.type;
  newCard.querySelector('.popup__text--capacity').textContent = similarAds[n].author.offer.rooms + ' комнаты для ' + similarAds[n].author.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'заезд после ' + similarAds[n].author.offer.checkin + ', выезд до ' + similarAds[n].author.offer.checkout;

  newCard.querySelector('.popup__features').remove(); // фичи
  var featuresList = createNode('ul', 'popup__features', similarAds[n].author.offer.features, 'li', 'popup__feature');
  newCard.querySelector('.popup__description').before(featuresList);

  newCard.querySelector('.popup__description').textContent = similarAds[n].author.offer.description;

  for (var d = 0; d < similarAds[n].author.offer.photos.length; d++) {
    var photoTemplate = newCard.querySelector('.popup__photo').cloneNode(true);
    photoTemplate.src = similarAds[n].author.offer.photos[d];
    var photoPopups = newCard.querySelector('.popup__photos');
    photoPopups.append(photoTemplate);
  }

  fragmentCard.append(newCard);
}

mapFilters.before(fragmentCard);
document.querySelector('.popup__photo').remove();
document.querySelector('.map').classList.remove('map--faded');

