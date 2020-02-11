'use strict';

(function () {

  var PRICE_MIN = 5000;
  var PRICE_MAX = 55000;

  var GUESTS_MIN = 1;
  var GUESTS_MAX = 5;

  var ROOMS_MIN = 1;
  var ROOMS_MAX = 5;

  var IMAGES_MAX = 3;

  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var AD_AMOUNT = 8;

  var TITLES = [
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

  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;

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

  var getRandomFeatures = function (array) {
    var featuresCount = getRandomRange(0, array.length);
    shuffleArray(FEATURES);
    return array.slice(featuresCount);
  };

  var getRandomRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  var getSimilarAds = function () {
    var similarAds = [];
    for (var k = 1; k <= AD_AMOUNT; k++) {
      similarAds.push(getSimilarAd(k));
    }
    return similarAds;
  };

  window.data = {
    getSimilarAd: getSimilarAd,
    getRandomFeatures: getRandomFeatures,
    getSimilarAds: getSimilarAds
  };
})();

