'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 22;
  var similarAds = window.data.getSimilarAds();

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

  window.pin = {
    renderSimilarAds: renderSimilarAds,
    findAddress: findAddress
  };
})();
