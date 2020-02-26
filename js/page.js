'use strict';

(function () {

  var pageDeactivate = function (flag) {
    var fieldsetCollection = document.querySelectorAll('form fieldset');
    fieldsetCollection.forEach(function (element) {
      element.disabled = flag;
    });
  };

  var pageActivate = function () {
    pageDeactivate(false);
    window.map.drawSimilarAds(window.data.similarAds); // откуда брать массив данных?
    // window.map.drawCard(window.data.similarAds[0]); // отрисовка карточки
    window.form.checkCapacityValidity(); // проверка на валидность поля capacity (кол-во гостей)
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    drawPinCoords(true);
  };

  var drawPinCoords = function (isActive) { // отрисовка координат в активном/неактивном состояниях
    var mapPin = document.querySelector('.map__pin--main'); // главная метка
    var addressField = document.querySelector('#address');
    var mainPinAddress = window.map.findAddress(mapPin, isActive);
    addressField.value = mainPinAddress.left + ', ' + mainPinAddress.top;
  };

  pageDeactivate(true);

  window.page = {
    pageActivate: pageActivate,
    pageDeactivate: pageDeactivate,
    drawPinCoords: drawPinCoords
  };
})();
