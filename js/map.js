'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 22;

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

  var renderSimilarAds = function () { // функция отрисовки похожих объявлений
    var mapPins = document.querySelector('.map__pins');
    var fragmentPin = document.createDocumentFragment();

    for (var t = 0; t < window.pin.similarAds.length; t++) {
      var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
      var offsetX = window.pin.similarAds[t].author.location.x - pinTemplate.offsetWidth / 2;
      var offsetY = window.pin.similarAds[t].author.location.y - pinTemplate.offsetHeight;
      pinTemplate.style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px';
      pinTemplate.querySelector('img').src = window.pin.similarAds[t].author.avatar;
      pinTemplate.querySelector('img').alt = window.pin.similarAds[t].author.offer.title;
      fragmentPin.append(pinTemplate);
    }

    mapPins.append(fragmentPin);
  };

  window.map = {
    findAddress: findAddress,
    renderSimilarAds: renderSimilarAds
  };
})();
