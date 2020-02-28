'use strict';

(function () {

  var pageDeactivate = function (flag) {
    var fieldsetCollection = document.querySelectorAll('form fieldset');
    fieldsetCollection.forEach(function (element) {
      element.disabled = flag;
    });
  };

  var onTryAgainButtonPress = function (evt) {
    evt.preventDefault();
    document.querySelector('.error').remove();
    pageDeactivate(true);
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
  };

  var pageActivate = function () {
    pageDeactivate(false);
    window.load('https://js.dump.academy/keksobooking/data', function (similarAds) {
      window.map.drawSimilarAds(similarAds);
    }, function (error) {
      var errorFragment = document.createDocumentFragment();
      var errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      errorPopup.querySelector('.error__message').textContent = error;
      errorFragment.append(errorPopup);
      document.body.append(errorFragment);
      errorPopup.querySelector('.error__button').addEventListener('click', onTryAgainButtonPress);
    });
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
