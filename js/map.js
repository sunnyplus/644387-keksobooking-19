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

  var drawSimilarAds = function () {
    var fragmentPin = window.pin.renderSimilarAds();
    var mapPins = document.querySelector('.map__pins'); // блок пинов
    mapPins.append(fragmentPin);
  };

  var drawCard = function () { // функция отрисовки карточки
    var mapFilters = document.querySelector('.map__filters-container'); // для показа объявления
    var fragmentCard = window.card.renderCard();
    mapFilters.before(fragmentCard);
    document.querySelector('.popup__photo').remove();
  };

  window.map = {
    findAddress: findAddress,
    drawSimilarAds: drawSimilarAds,
    drawCard: drawCard
  };
})();
