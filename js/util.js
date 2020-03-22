'use strict';

(function () {

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
