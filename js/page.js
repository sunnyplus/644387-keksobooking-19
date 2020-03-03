'use strict';

(function () {

  var formActivate = function (flag) {

    document.querySelectorAll('form fieldset').forEach(function (element) {
      element.disabled = flag;
    });
  };

  var onTryAgainButtonPress = function (evt) {
    evt.preventDefault();
    document.querySelector('.error').remove();
    formActivate(true);
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
  };

  var createErrorPopup = function (error) {
    var errorFragment = document.createDocumentFragment();
    var errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    errorPopup.querySelector('.error__message').textContent = error;
    errorFragment.append(errorPopup);
    document.body.append(errorFragment);
    errorPopup.querySelector('.error__button').addEventListener('click', onTryAgainButtonPress);
  };

  var pageActivate = function () {

    formActivate(false); // активация формы disabled = false

    window.backend(window.map.drawSimilarAds, createErrorPopup);

    window.backend(window.map.drawCard, createErrorPopup);

    window.form.checkCapacityValidity(); // проверка на валидность поля capacity (кол-во гостей)
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    window.form.setPinCoords(true);
  };

  formActivate(true);

  window.page = {
    pageActivate: pageActivate
  };
})();
