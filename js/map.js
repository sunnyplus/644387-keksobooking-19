'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 22;

  var mapPin = document.querySelector('.map__pin--main'); // главная метка
  // var similarPin = document.querySelectorAll('.map__pin'); // похожие метки
  var mapPins = document.querySelector('.map__pins'); // блок с пинами

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

  var drawSimilarAds = function (similarAds) {
    var fragmentPin = document.createDocumentFragment();
    similarAds.forEach(function (similarAd) { // этот массив и нужно передать в отрисовку карточки при клике
      var pinTemplate = window.pin.renderSimilarAds(similarAd);
      pinTemplate.addEventListener('click', onSimilarPinPress); // обработчик на отрисованный пин
      fragmentPin.append(pinTemplate); // добавляем пин во фрагмент
    });

    mapPins.append(fragmentPin);

  };

  var drawCard = function (similarAds) {

    var fragmentCard = document.createDocumentFragment();
    var mapFilters = document.querySelector('.map__filters-container'); // для показа объявления
    var newCard = window.card.renderCard(similarAds[2]); // третий элемент пока для теста
    fragmentCard.append(newCard);
    mapFilters.before(fragmentCard);
    document.querySelector('.popup__photo').remove();
  };

  var onSimilarPinPress = function () { // -----------------------------------------------------------------
  };

  mapPin.addEventListener('mousedown', function (evt) { // обработчик клика на главную метку
    if (evt.button === 0) {
      window.page.pageActivate();
    }
  });

  mapPin.addEventListener('keydown', function (evt) { // обработчик нажатия на главную метку
    if (evt.key === 'Enter') {
      window.page.pageActivate();
    }
  });

  window.map = {
    findAddress: findAddress,
    drawSimilarAds: drawSimilarAds,
    drawCard: drawCard
  };
})();
