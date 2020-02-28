'use strict';

(function () {

  var renderSimilarAds = function (similarAd) { // функция генерации пинов, на входе pin - данные по одному объявлению
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
    var offsetX = similarAd.location.x - pinTemplate.offsetWidth / 2;
    var offsetY = similarAd.location.y - pinTemplate.offsetHeight;
    pinTemplate.style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px';
    pinTemplate.querySelector('img').src = similarAd.author.avatar;
    pinTemplate.querySelector('img').alt = similarAd.offer.title;

    return pinTemplate;
  };

  window.pin = {
    renderSimilarAds: renderSimilarAds
  };
})();
