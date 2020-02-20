'use strict';

(function () {

  var renderSimilarAds = function () { // функция генерации пинов
    var fragmentPin = document.createDocumentFragment();
    var similarAds = window.data.getSimilarAds();

    similarAds.forEach(function (ad) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
      var offsetX = ad.author.location.x - pinTemplate.offsetWidth / 2;
      var offsetY = ad.author.location.y - pinTemplate.offsetHeight;
      pinTemplate.style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px';
      pinTemplate.querySelector('img').src = ad.author.avatar;
      pinTemplate.querySelector('img').alt = ad.author.offer.title;
      fragmentPin.append(pinTemplate); // добавляем пин во фрагмент
    });

    return fragmentPin;
  };

  window.pin = {
    renderSimilarAds: renderSimilarAds
  };
})();
