'use strict';

(function () {
  var PIN_POINTER_HEIGHT = 22;

  var mapPin = document.querySelector('.map__pin--main'); // главная метка
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
    // window.map.similarAds = similarAds;
    // console.log(similarAds);
    var fragmentPin = document.createDocumentFragment();
    var filteredSimilarAds = window.filter.amount(similarAds, 5);
    filteredSimilarAds.forEach(function (similarAd) {
      var pinTemplate = window.pin.renderSimilarAds(similarAd);
      pinTemplate.addEventListener('click', function () {
        drawCard(similarAd); // по клику на пин отрисовываем карточку
      }); // обработчик на отрисованный пин
      fragmentPin.append(pinTemplate); // добавляем пин во фрагмент
    });

    mapPins.append(fragmentPin);

  };

  var drawCard = function (similarAd) {

    var fragmentCard = document.createDocumentFragment();
    var mapFilters = document.querySelector('.map__filters-container'); // для показа объявления
    var newCard = window.card.renderCard(similarAd);
    fragmentCard.append(newCard);
    mapFilters.before(fragmentCard);
    document.querySelector('.popup__photo').remove();
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
