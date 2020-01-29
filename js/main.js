'use strict';

var AD_AMOUNT = 8;

var mapWidth = document.querySelector('.map').offsetWidth;

var titles = [
  'Уютное гнездышко для молодоженов',
  'Маленькая квартирка рядом с парком',
  'Небольшая лавочка в парке'
];
var addresses = [
  '102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō',
  'Chiyoda-ku, Tōkyō-to 102-0091',
  '1-1 Chiyoda, Chiyoda-ku, Tōkyō-to 100-8111'
];
var types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var checkins = [
  '12:00',
  '13:00',
  '14:00'
];
var checkouts = [
  '12:00',
  '13:00',
  '14:00'
];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var descriptions = [
  'Великолепный таун-хауз в центре Токио. Подходит как туристам, так и бизнесменам. Дом полностью укомплектован и имеет свежий ремонт.',
  'Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.',
  'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
  'Замечательный дворец в старинном центре города. Только для тех кто может себе позволить дворец. Лакеев и прочих жокеев просим не беспокоить.'
];
var getRandomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomArray = function (count) {
  var randomArray = [];
  for (var i = 0; i < getRandomRange(1, count); i++) {
    randomArray.push('http://o0.github.io/assets/images/tokyo/hotel' + i + '.jpg');
  }
  return randomArray;
};

var shuffle = function (a) {
  var j;
  var x;
  var i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

var getRandomFeatures = function (array) {
  var featuresCount = getRandomRange(1, array.length);
  var featuresRandom = [];
  shuffle(features);
  for (var j = 0; j < featuresCount; j++) {
    featuresRandom.push(features[j]);
  }
  return featuresRandom;
};

var similarAds = [];

var getSimilarAd = function (userNumber) {
  return {
    author: {
      avatar: 'img/avatars/user0' + userNumber + '.png',
      offer: {
        title: getRandomElement(titles),
        address: getRandomElement(addresses),
        price: getRandomRange(42000, 63000),
        type: getRandomElement(types),
        rooms: getRandomRange(1, 15),
        guests: getRandomRange(1, 15),
        checkin: getRandomElement(checkins),
        checkout: getRandomElement(checkouts),
        features: getRandomFeatures(features),
        description: getRandomElement(descriptions),
        photos: getRandomArray(10)
      },
      location: {
        x: getRandomRange(0, mapWidth),
        y: getRandomRange(130, 630)
      }
    }
  };
};


for (var k = 1; k <= AD_AMOUNT; k++) {
  similarAds.push(getSimilarAd(k));
}

// console.log(similarAds);

var mapPins = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();

for (var t = 0; t < similarAds.length; t++) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
  var offsetX = similarAds[t].author.location.x - pinTemplate.offsetWidth / 2;
  var offsetY = similarAds[t].author.location.y - pinTemplate.offsetHeight;
  pinTemplate.style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px';
  pinTemplate.querySelector('img').src = similarAds[t].author.avatar;
  pinTemplate.querySelector('img').alt = similarAds[t].author.offer.title;
  fragment.appendChild(pinTemplate);
}

mapPins.appendChild(fragment);
document.querySelector('.map').classList.remove('map--faded');
