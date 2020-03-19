'use strict';

(function () {

  // var map = document.querySelector('.map');
  // var mapWidth = map.offsetWidth;

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

  // var getRandomFeatures = function (array) {
  //   var featuresCount = getRandomRange(0, array.length);
  //   shuffleArray(FEATURES);
  //   return array.slice(featuresCount);
  // };

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

  // var getSimilarAd = function (userNumber) {
  //   return {
  //     author: {
  //       avatar: 'img/avatars/user0' + userNumber + '.png',
  //       offer: {
  //         title: getRandomElement(TITLES),
  //         address: getRandomElement(ADDRESSES),
  //         price: getRandomRange(PRICE_MIN, PRICE_MAX),
  //         type: getRandomElement(TYPES),
  //         rooms: getRandomRange(ROOMS_MIN, ROOMS_MAX),
  //         guests: getRandomRange(GUESTS_MIN, GUESTS_MAX),
  //         checkin: getRandomElement(CHECKINS),
  //         checkout: getRandomElement(CHECKOUTS),
  //         features: getRandomFeatures(FEATURES),
  //         description: getRandomElement(DESCRIPTIONS),
  //         photos: getRandomImages(IMAGES_MAX)
  //       },
  //       location: {
  //         x: getRandomRange(0, mapWidth),
  //         y: getRandomRange(LOCATION_Y_MIN, LOCATION_Y_MAX)
  //       }
  //     }
  //   };
  // };

  // var getSimilarAds = function () {
  //   var similarAds = [];
  //   for (var i = 1; i <= AD_AMOUNT; i++) {
  //     similarAds.push(getSimilarAd(i));
  //   }
  //   return similarAds;
  // };

  var dropElement = function (element) {
    var elementToDrop = document.querySelector(element);
    if (elementToDrop) {
      elementToDrop.remove();
    }
  };

  window.util = {
    dropElement: dropElement,
    getRandomElement: getRandomElement,
    shuffleArray: shuffleArray,
    getRandomImages: getRandomImages
  };
})();
