'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 22;
  var MAX_ADS_AMOUNT = 5;

  var mapPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins'); // блок с пинами
  var filtersForm = document.querySelector('.map__filters');

  var findAddress = function (isActive) { // функция определения координат метки в активном (true) и неактивном (false) состоянии.
    mapPin = document.querySelector('.map__pin--main');
    if (isActive === true) {
      var pinOffsetY = mapPin.offsetHeight + PIN_POINTER_HEIGHT;
    } else {
      pinOffsetY = mapPin.offsetHeight / 2;
    }
    return {
      left: Math.floor(mapPin.offsetLeft + mapPin.offsetWidth / 2),
      top: Math.floor(mapPin.offsetTop + pinOffsetY)
    };
  };

  var pinDrop = function () { // очищает похожие объявления
    document.querySelectorAll('.map__pin').forEach(function (element) {
      if (element.className === 'map__pin' || element.classList.contains('map__pin--active')) {
        element.remove();
      }
    });
  };

  var drawSimilarAds = function (similarAds) {
    var fragmentPin = document.createDocumentFragment();
    var filteredSimilarAds = [];

    for (var i = 0; i < similarAds.length; i++) {
      if (similarAds[i].hasOwnProperty('offer')) { // проверяем наличие ключа offer
        filteredSimilarAds.push(similarAds[i]);
      }
      if (filteredSimilarAds.length === MAX_ADS_AMOUNT) {
        break;
      }
    }

    filteredSimilarAds.forEach(function (similarAd) {
      var pinTemplate = window.pin.renderSimilarAds(similarAd);
      pinTemplate.addEventListener('click', function () {
        drawCard(similarAd); // по клику на пин отрисовываем карточку
        document.querySelectorAll('.map__pin--active').forEach(function (element) {
          element.classList.remove('map__pin--active');
        });
        pinTemplate.classList.add('map__pin--active');
      });
      pinTemplate.addEventListener('keydown', window.page.onEscapePress);
      fragmentPin.append(pinTemplate); // добавляем пин во фрагмент
    });

    mapPins.append(fragmentPin);
    window.page.formActivate(filtersForm, false);
  };

  var drawCard = function (similarAd) {
    window.util.dropElement('.map__card');
    var fragmentCard = document.createDocumentFragment();
    var mapFilters = document.querySelector('.map__filters-container'); // для показа объявления
    var newCard = window.card.renderCard(similarAd);
    fragmentCard.append(newCard);
    mapFilters.before(fragmentCard);
    document.querySelector('.popup__photo').remove();
    newCard.querySelector('.popup__close').addEventListener('click', onPopupClose);
    newCard.addEventListener('keydown', window.page.onEscapePress);
  };

  var onPopupClose = function () {
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', window.page.onEscapePress);
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
    drawCard: drawCard,
    pinDrop: pinDrop
  };
})();
